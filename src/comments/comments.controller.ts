import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth2/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:commentId')
  async deleteComment(@Param('commentId') commentId: string, @Req() req: any) {
    return this.commentsService.deleteComment(commentId, req.user.userId);
  }
}
