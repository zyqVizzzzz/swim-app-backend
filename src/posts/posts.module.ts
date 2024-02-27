import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequenceService } from '../sequence/sequence.service';
import { PostSchema } from './posts.schema';
import { IdCounterSchema } from '../sequence/idCounter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'IdCounter', schema: IdCounterSchema }
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, SequenceService],
})
export class PostsModule {}
