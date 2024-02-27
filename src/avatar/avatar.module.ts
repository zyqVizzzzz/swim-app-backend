import { Module } from '@nestjs/common';
// import { MulterModule } from '@nestjs/platform-express';
import { AvatarController } from './avatar.controller';

@Module({
  // imports: [
  //   MulterModule.register({
  //     dest: './uploads', // 上传文件保存的目录
  //   }),
  // ],
  controllers: [AvatarController],
})
export class AvatarModule {}