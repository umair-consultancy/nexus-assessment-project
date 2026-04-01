import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddMessageDto } from './dto/add-message.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation, ConversationDocument } from './schemas/conversation.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<ConversationDocument>,
  ) {}

  async create(userId: string, createConversationDto: CreateConversationDto): Promise<Conversation> {
    return this.conversationModel.create({
      ...createConversationDto,
      userId,
      messages:
        createConversationDto.messages?.map((message) => ({
          ...message,
          timestamp: new Date().toISOString(),
        })) ?? [],
    });
  }

  async findAllByUser(userId: string): Promise<Conversation[]> {
    return this.conversationModel
      .find({ userId })
      .sort({ updatedAt: -1 })
      .lean()
      .exec();
  }

  async findOne(userId: string, id: string): Promise<Conversation> {
    const conversation = await this.conversationModel.findOne({ _id: id, userId }).lean().exec();
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    return conversation;
  }

  async update(
    userId: string,
    id: string,
    updateConversationDto: UpdateConversationDto,
  ): Promise<Conversation> {
    const conversation = await this.conversationModel
      .findOneAndUpdate({ _id: id, userId }, updateConversationDto, { new: true })
      .lean()
      .exec();
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    return conversation;
  }

  async addMessage(userId: string, id: string, addMessageDto: AddMessageDto): Promise<Conversation> {
    const conversation = await this.conversationModel
      .findOneAndUpdate(
        { _id: id, userId },
        {
          $push: {
            messages: {
              ...addMessageDto,
              timestamp: new Date().toISOString(),
            },
          },
        },
        { new: true },
      )
      .lean()
      .exec();
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    return conversation;
  }

  async remove(userId: string, id: string): Promise<void> {
    const result = await this.conversationModel.findOneAndDelete({ _id: id, userId }).exec();
    if (!result) {
      throw new NotFoundException('Conversation not found');
    }
  }
}
