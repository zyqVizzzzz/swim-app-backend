import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequenceService } from '../sequence/sequence.service';
import { PostSchema } from './posts.schema';
import { IdCounterSchema } from '../sequence/idCounter.schema';
import { UsersModule } from '../users/users.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'IdCounter', schema: IdCounterSchema }
    ]),
    UsersModule,
    CommentsModule
  ],
  controllers: [PostsController],
  providers: [PostsService, SequenceService],
  exports: [PostsService]
})
export class PostsModule {}
