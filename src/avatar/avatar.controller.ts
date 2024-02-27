import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as COS from 'cos-nodejs-sdk-v5';

@Controller('avatar')
export class AvatarController {
  private cos;

  constructor() {
    this.cos = new COS({
      SecretId: 'AKIDPefR0KmBUaT7Rr9GFD8sSsBh6JH1XsCx',
      SecretKey: 'jNdonbHqBYr3JVWdcN1Rp8MacXLBMTN4',
    });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);

    const Bucket = 'swim-test-1251994034'; // Bucket名称，格式为：test-1250000000
    const Region = 'ap-shanghai'; // Bucket所在区域
    const Key = `avatars/${Date.now()}-${file.originalname}`; // 上传到COS的对象键
    console.log(file.buffer)
    // 使用Promise封装上传逻辑
    const uploadPromise = new Promise((resolve, reject) => {
      this.cos.putObject({
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
