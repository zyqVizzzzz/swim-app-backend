import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface'; // 定义接口
import { CreatePostDto } from './dto/create-post.dto';
import { SequenceService } from '../sequence/sequence.service'; // 引入SequenceService
import { UsersService } from '../users/users.service';

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
