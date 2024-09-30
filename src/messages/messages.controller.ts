import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MessageService } from './messages.service';
import { Message } from './messages.schema';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('Send')
  async sendMessage(
    @Body('senderId') senderId: string,
    @Body('receiverId') receiverId: string,
    @Body('content') content: string,
  ) {
    return this.messageService.sendMessage(senderId, receiverId, content);
  }

  @Get('between/:user1/:user2')
  async getMessages(
    @Param('user1') user1: string,
    @Param('user2') user2: string,
  ): Promise<Message[]> {
    return this.messageService.getMessagesBetweenUsers(user1, user2);
  }
}
