import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { IdParamDto } from '../../common/dto/id-param.dto';
import { IResponse } from '../../common/interfaces/response.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { AddMessageDto } from './dto/add-message.dto';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@ApiTags('Chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() createConversationDto: CreateConversationDto,
  ): Promise<IResponse<unknown>> {
    const data = await this.chatService.create(user.sub, createConversationDto);
    return { success: true, data, message: 'Conversation created successfully' };
  }

  @Get()
  async findAll(@CurrentUser() user: JwtPayload): Promise<IResponse<unknown>> {
    const data = await this.chatService.findAllByUser(user.sub);
    return { success: true, data };
  }

  @Get(':id')
  async findOne(
    @CurrentUser() user: JwtPayload,
    @Param() { id }: IdParamDto,
  ): Promise<IResponse<unknown>> {
    const data = await this.chatService.findOne(user.sub, id);
    return { success: true, data };
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: JwtPayload,
    @Param() { id }: IdParamDto,
    @Body() updateConversationDto: UpdateConversationDto,
  ): Promise<IResponse<unknown>> {
    const data = await this.chatService.update(user.sub, id, updateConversationDto);
    return { success: true, data, message: 'Conversation updated successfully' };
  }

  @Post(':id/messages')
  async addMessage(
    @CurrentUser() user: JwtPayload,
    @Param() { id }: IdParamDto,
    @Body() addMessageDto: AddMessageDto,
  ): Promise<IResponse<unknown>> {
    const data = await this.chatService.addMessage(user.sub, id, addMessageDto);
    return { success: true, data, message: 'Message added successfully' };
  }

  @Delete(':id')
  async remove(
    @CurrentUser() user: JwtPayload,
    @Param() { id }: IdParamDto,
  ): Promise<IResponse<null>> {
    await this.chatService.remove(user.sub, id);
    return { success: true, message: 'Conversation deleted successfully' };
  }
}
