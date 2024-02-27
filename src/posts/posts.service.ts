import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface'; // 定义接口
import { CreatePostDto } from './dto/create-post.dto';
import { SequenceService } from '../sequence/sequence.service'; // 引入SequenceService


@Injectable()
export class PostsService {
  constructor(
    private sequenceService: SequenceService, // 注入SequenceService,
    @InjectModel('Post') private readonly postModel: Model<Post>
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post_id = await this.sequenceService.getNextSequenceValue('Post');
    const createdPost = new this.postModel({...createPostDto, post_id});
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }
  
  async update(id: string, updatePostDto: CreatePostDto): Promise<Post> {
    const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
    if (!updatedPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return updatedPost;
  }

  async delete(id: string): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndDelete(id).exec();
    if (!deletedPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return deletedPost;
  }
}
