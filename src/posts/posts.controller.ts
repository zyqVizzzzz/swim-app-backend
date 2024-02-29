import { Controller, Get, Post, Param, Delete, Put, NotFoundException, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto'; // 定义DTO

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Post('/:postId/comments')
  async addComment(
    @Param('postId') postId: string,
    @Body() createCommentDto: any
  ) {
    return this.postsService.addComment(postId, createCommentDto);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
