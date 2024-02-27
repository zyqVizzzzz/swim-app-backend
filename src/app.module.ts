import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SequenceService } from './sequence/sequence.service';
import { IdCounterSchema } from './sequence/idCounter.schema';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/unidb'), 
    MongooseModule.forFeature([{ name: 'IdCounter', schema: IdCounterSchema }]),
    UsersModule, 
    PostsModule, 
    AvatarModule
  ],
  controllers: [AppController],
  providers: [AppService, SequenceService],
  exports: [SequenceService]
})
export class AppModule {}
