import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './messages.schema';

@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private messageModel: Model<Message>) {}

  async sendMessage(
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<Message> {
    const message = new this.messageModel({
      sender: senderId,
      receiver: receiverId,
      content,
    });
    return message.save();
  }

  async getMessagesBetweenUsers(
    user1: string,
    user2: string,
  ): Promise<Message[]> {
    return await this.messageModel
      .find({
        $or: [
          { sender: user1, receiver: user2 },
          { sender: user2, receiver: user1 },
        ],
      })
      .sort({ timestamp: 1 })
      .exec();
  }
}
