import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as COS from 'cos-nodejs-sdk-v5';
import { Express } from 'express';

@Injectable()
export class ImageUploadService {
  private cos;

  constructor(private readonly configService: ConfigService) {
    this.cos = new COS({
      SecretId: this.configService.get<string>('TENCENT_SECRET_ID'),
      SecretKey: this.configService.get<string>('TENCENT_SECRET_KEY'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file)
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);

    const Bucket = this.configService.get<string>('TENCENT_BUCKET');
    const Region = this.configService.get<string>('TENCENT_REGION');
    const Key = `posts/${Date.now()}-${file.originalname}`;

    const uploadPromise = new Promise<string>((resolve, reject) => {
      this.cos.putObject(
        {
          Bucket,
          Region,
          Key,
          Body: file.buffer,
        },
        (err, data) => {
          if (err)
            reject(
              new HttpException(
                'Failed to upload image',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          else resolve(`https://${Bucket}.cos.${Region}.myqcloud.com/${Key}`);
        },
      );
    });

    return uploadPromise;
  }
}
