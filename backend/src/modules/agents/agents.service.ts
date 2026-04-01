import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent, AgentDocument } from './schemas/agent.schema';

@Injectable()
export class AgentsService {
  constructor(@InjectModel(Agent.name) private readonly agentModel: Model<AgentDocument>) {}

  async create(userId: string, createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentModel.create({ ...createAgentDto, userId });
  }

  async findAllByUser(userId: string): Promise<Agent[]> {
    return this.agentModel.find({ userId }).sort({ updatedAt: -1 }).lean().exec();
  }

  async findOne(userId: string, id: string): Promise<Agent> {
    const agent = await this.agentModel.findOne({ _id: id, userId }).lean().exec();
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }
    return agent;
  }

  async update(userId: string, id: string, updateAgentDto: UpdateAgentDto): Promise<Agent> {
    const agent = await this.agentModel
      .findOneAndUpdate({ _id: id, userId }, updateAgentDto, { new: true })
      .lean()
      .exec();
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }
    return agent;
  }

  async remove(userId: string, id: string): Promise<void> {
    const result = await this.agentModel.findOneAndDelete({ _id: id, userId }).exec();
    if (!result) {
      throw new NotFoundException('Agent not found');
    }
  }
}
