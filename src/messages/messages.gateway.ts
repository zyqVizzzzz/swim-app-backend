import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './messages.service';

@WebSocketGateway({ namespace: 'chat' })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody()
    data: { senderId: string; receiverId: string; content: string },
    // @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messageService.sendMessage(
      data.senderId,
      data.receiverId,
      data.content,
    );
    this.server.to(data.receiverId).emit('receive_message', message);
    return message;
  }

  @SubscribeMessage('join')
  handleJoinRoom(
    @MessageBody('userId') userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(userId);
  }
}
