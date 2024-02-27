import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequenceService } from './sequence/sequence.service';
import { IdCounterSchema } from './sequence/idCounter.schema';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AvatarModule } from './avatar/avatar.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // 依赖注入 ConfigModule
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get<string>('DATABASE_HOST')}:${configService.get<string>('DATABASE_PORT')}/unidb`,
      }),
      inject: [ConfigService], // 将 ConfigService 作为依赖注入
    }), 
    MongooseModule.forFeature([{ name: 'IdCounter', schema: IdCounterSchema }]),
    UsersModule, 
    PostsModule, 
    AvatarModule,
  ],
  controllers: [AppController],
  providers: [AppService, SequenceService],
  exports: [SequenceService]
})
export class AppModule {}
