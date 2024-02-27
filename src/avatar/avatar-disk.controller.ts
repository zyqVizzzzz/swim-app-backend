import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@Controller('avatar')
export class AvatarController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // 上传文件保存的目录
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    try {
      // 处理上传的文件
      return { filename: file.filename };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file');
    }
  }
}