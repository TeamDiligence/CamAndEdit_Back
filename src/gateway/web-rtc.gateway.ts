import { Logger, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JoinRoomRequest, roomUserType } from './dto/web-rtc.dto';

@WebSocketGateway({ transports: ['websocket'] })
export class WebRtcGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wsServer: Server;

  private logger = new Logger(WebRtcGateway.name);

  private roomUser: roomUserType = {};
  private simpleRoom: { [key: string]: string } = {};

  @UseInterceptors()
  @SubscribeMessage('join_room')
  public joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinRoomRequest,
  ) {
    this.logger.log('join_room event');
    const { nickname, room: roomName } = data;

    if (this.roomUser[roomName]) {
      const isExist = this.existUserCheck(client.id, roomName);

      if (isExist) {
        return;
      }
      this.roomUser[roomName].push({ id: client.id, nickname });
    } else {
      this.roomUser[roomName] = [
        {
          id: client.id,
          nickname,
        },
      ];
    }

    this.simpleRoom[client.id] = roomName;

    client.join(roomName);

    const roomUserInfo = this.roomUser[roomName].filter(
      (user) => user.id != client.id,
    );

    client.in(roomName).emit('all_users', roomUserInfo);
  }

  @SubscribeMessage('offer')
  public callUser(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    this.logger.log('offer event');
    client.broadcast.emit('getOffer', data);
  }

  @SubscribeMessage('answer')
  public answer(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    this.logger.log('answer event');
    client.broadcast.emit('getAnswer', data);
  }

  @SubscribeMessage('candidate')
  public candidate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    this.logger.log('candidate event');
    client.broadcast.emit('getCandidate', data);
  }

  private existUserCheck(socketId: string, roomName: string): boolean {
    const findUser = this.roomUser[roomName].find((user) => {
      if (user.id === socketId) return user;
    });
    if (findUser) {
      return true;
    }
    return false;
  }

  afterInit() {
    this.logger.log('init WebRtc GateWay');
  }

  handleConnection(client: Socket): void {
    this.logger.log(client.id + 'connected!');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(client.id + 'exit!');
    const roomInfo = this.simpleRoom[client.id];
    let room = this.roomUser[roomInfo];
    if (room) {
      room = room.filter((user) => user.id !== client.id);
      this.roomUser[roomInfo] = room;
    }

    this.wsServer.to(roomInfo).emit('user_exit', { id: client.id });
  }
}
