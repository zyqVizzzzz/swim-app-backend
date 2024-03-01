import { Controller, Get, Post, Param, UseGuards, Body, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto'; // 定义DTO
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findPostsByUserId(@Req() req: any) {
    return this.postsService.findPostsByUserId(req.user.userId)
  }

  @Get('comments/:postId')
  @UseGuards(JwtAuthGuard)
  async findCommentsByPostId(@Param('postId') postId: string) {
    return this.postsService.findCommentsByPostId(postId)
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Post('delete/:postId')
  async delete(@Param('postId') postId: string) {
    return this.postsService.delete(postId);
  }
}
