import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentSchema } from './comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comments', schema: CommentSchema }])
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [
    CommentsModule, 
    MongooseModule.forFeature([{ name: 'Comments', schema: CommentSchema }])
  ]
})
export class CommentsModule {}
