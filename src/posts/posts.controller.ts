import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Body,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto'; // 定义DTO
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from '../avatar/image-upload.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly imageUploadService: ImageUploadService, // 注入ImageUploadService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPostDto: CreatePostDto,
  ) {
    const imageUrls = await Promise.all(
      files.map((file) => this.imageUploadService.uploadImage(file)),
    );

    const postDtoWithImages = { ...createPostDto, images: imageUrls };
    return this.postsService.create(postDtoWithImages);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findPostsByUserId(@Req() req: any) {
    return this.postsService.findPostsByUserId(req.user.userId);
  }

  @Get('comments/:postId')
  @UseGuards(JwtAuthGuard)
  async findCommentsByPostId(@Param('postId') postId: string) {
    return this.postsService.findCommentsByPostId(postId);
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Post('delete/:postId')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('postId') postId: string) {
    return this.postsService.delete(postId);
  }

  @Post('like/:postId')
  @UseGuards(JwtAuthGuard)
  async like(@Param('postId') postId: string, @Req() req: any) {
    return this.postsService.like(postId, req.user.userId);
  }
}
