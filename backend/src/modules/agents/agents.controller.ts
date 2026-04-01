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
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@ApiTags('Agents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() createAgentDto: CreateAgentDto,
  ): Promise<IResponse<unknown>> {
    const data = await this.agentsService.create(user.sub, createAgentDto);
    return { success: true, data, message: 'Agent created successfully' };
  }

  @Get()
  async findAll(@CurrentUser() user: JwtPayload): Promise<IResponse<unknown>> {
    const data = await this.agentsService.findAllByUser(user.sub);
    return { success: true, data };
  }

  @Get(':id')
  async findOne(
    @CurrentUser() user: JwtPayload,
    @Param() { id }: IdParamDto,
  ): Promise<IResponse<unknown>> {
    const data = await this.agentsService.findOne(user.sub, id);
    return { success: true, data };
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: JwtPayload,
    @Param() { id }: IdParamDto,
    @Body() updateAgentDto: UpdateAgentDto,
  ): Promise<IResponse<unknown>> {
    const data = await this.agentsService.update(user.sub, id, updateAgentDto);
    return { success: true, data, message: 'Agent updated successfully' };
  }

  @Delete(':id')
  async remove(
    @CurrentUser() user: JwtPayload,
    @Param() { id }: IdParamDto,
  ): Promise<IResponse<null>> {
    await this.agentsService.remove(user.sub, id);
    return { success: true, message: 'Agent deleted successfully' };
  }
}
