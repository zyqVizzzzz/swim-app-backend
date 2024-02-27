import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as COS from 'cos-nodejs-sdk-v5';

@Controller('avatar')
export class AvatarController {
  private cos;
  constructor(private readonly configService: ConfigService) {}

  private getCosClient() {
    if (!this.cos) {
      this.cos = new COS({
        SecretId: this.configService.get<string>('TENCENT_SECRET_ID'),
        SecretKey: this.configService.get<string>('TENCENT_SECRET_KEY'),
      });
    }
    return this.cos;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);

    const cosClient = this.getCosClient();
    const Bucket = this.configService.get<string>('TENCENT_BUCKET'); // Bucket名称，格式为：test-1250000000
    const Region = this.configService.get<string>('TENCENT_REGION'); // Bucket所在区域
    const Key = `avatars/${Date.now()}-${file.originalname}`; // 上传到COS的对象键
    
    // 使用Promise封装上传逻辑
    const uploadPromise = new Promise((resolve, reject) => {
      cosClient.putObject({
        Bucket,
        Region,
        Key,
        Body: file.buffer, // 使用文件的buffer
      }, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    try {
      const result = await uploadPromise;
      return { url: `https://${Bucket}.cos.${Region}.myqcloud.com/${Key}` };
    } catch (error) {
      throw new HttpException('Failed to upload image to COS', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
