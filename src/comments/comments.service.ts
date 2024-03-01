import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './interfaces/comment.interface'
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('Comments') private commentModel: Model<Comment>) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async deleteComment(commentId: string, userId: string): Promise<any> {
    const comment = await this.commentModel.findById(commentId).populate('post').exec() as any;
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    // 检查执行删除操作的用户是否为评论的发布者或帖子的发帖者
    if (comment.commenter.toString() !== userId && comment.post?.author.toString()){
      throw new UnauthorizedException('You do not have permission to delete this comment')
    }
    await comment.remove();
    return { message: 'Comment deleted successfully' };
  }
}