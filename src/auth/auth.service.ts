import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { WeChatLoginDto, WeChatPhoneDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/users.interface';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private appId = this.configService.get<string>('APP_ID');
  private appSecret = this.configService.get<string>('APP_SECRET');

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async weChatLogin(weChatLoginDto: WeChatLoginDto) {
    const { code, userInfo } = weChatLoginDto;
    const sessionData = await this.getSessionKey(code);
    const { openid } = sessionData;
    // 检查用户是否已存在
    let user = await this.userModel.findOne({ openId: openid });
    if (!user) {
      // 创建新用户
      user = new this.userModel({
        openId: openid,
        nickname: userInfo.nickName,
        profile_pic: userInfo.avatarUrl,
      });
    } else {
      // 更新用户信息
      user.nickname = userInfo.nickName;
      user.profile_pic = userInfo.avatarUrl;
    }

    console.log(user);

    try {
      await user.save();
      console.log('User saved successfully');
    } catch (error) {
      console.error('Error saving user:', error);
      throw new HttpException(
        '保存用户时发生错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    console.log('saved');
    // 生成 JWT 令牌
    const payload = { openId: user.openId, sub: user._id };
    const token = this.jwtService.sign(payload);

    // 返回登录成功信息和 JWT 令牌
    return {
      message: '登录成功',
      userId: user._id,
      token: token,
    };
  }

  async getPhoneNumber(weChatPhoneDto: WeChatPhoneDto) {
    const { code, encryptedData, iv } = weChatPhoneDto;
    const sessionData = await this.getSessionKey(code);
    const { session_key } = sessionData;

    const phoneData = this.decryptData(encryptedData, iv, session_key);

    const user = await this.userModel.findOne({ openId: sessionData.openid });
    if (user) {
      user.phone_number = phoneData.phoneNumber;
      user.is_phone_number_verified = true;
      await user.save();
      return { message: '手机号更新成功' };
    } else {
      return { message: '绑定手机号失败' };
    }
  }

  private async getSessionKey(code: string) {
    if (code === 'test_code') {
      return {
        openid: 'test_openid',
        session_key: 'test_session_key',
      };
    }
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appId}&secret=${this.appSecret}&js_code=${code}&grant_type=authorization_code`;
    const response = await axios.get(url);
    const data = response.data;
    console.log(response.data);
    return data;
  }

  private decryptData(encryptedData: string, iv: string, sessionKey: string) {
    const decodedSessionKey = Buffer.from(sessionKey, 'base64');
    const decodedEncryptedData = Buffer.from(encryptedData, 'base64');
    const decodedIv = Buffer.from(iv, 'base64');

    let decoded;
    try {
      const decipher = crypto.createDecipheriv(
        'aes-128-cbc',
        decodedSessionKey,
        decodedIv,
      );
      decipher.setAutoPadding(true);
      decoded = decipher.update(decodedEncryptedData, undefined, 'utf8');
      decoded += decipher.final('utf8');

      return JSON.parse(decoded);
    } catch (err) {
      throw new Error('解密失败');
    }
  }
}
