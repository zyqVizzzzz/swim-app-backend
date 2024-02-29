import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface'; // 定义接口
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-common.dto';
import { SequenceService } from '../sequence/sequence.service'; // 引入SequenceService
import { UsersService } from '../users/users.service';
import mongoose from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    private sequenceService: SequenceService, // 注入SequenceService,
    private usersService: UsersService,
    @InjectModel('Post') private readonly postModel: Model<Post>
  ) {}

  async create(createPostDto: any) {
    const { author } = createPostDto;
    const post_id = await this.sequenceService.getNextSequenceValue('Post');
    const createdPost = new this.postModel({
      ...createPostDto, 
      post_id, 
    });
    const result = await createdPost.save();
    
    await this.usersService.update(author, { $push: { posts: result._id } });
    return result;
  }

  async addComment(postId: string, createCommentDto: CreateCommentDto): Promise<Post> {
    const comment = {
      ...createCommentDto,
      commenter: new mongoose.Types.ObjectId(createCommentDto.commenter),
      createdAt: new Date()
    }

    const updatedPost = await this.postModel.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true, safe: true, upsert: true }
    ).exec();

    if(!updatedPost) {
      throw new NotFoundException(`Post with ID ${postId} not found`)
    }

    return updatedPost;
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
