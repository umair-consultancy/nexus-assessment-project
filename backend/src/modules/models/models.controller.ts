import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdParamDto } from '../../common/dto/id-param.dto';
import { IResponse } from '../../common/interfaces/response.interface';
import { CreateModelDto } from './dto/create-model.dto';
import { FilterModelsDto } from './dto/filter-models.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ModelsService } from './models.service';

@ApiTags('Models')
@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  async create(@Body() createModelDto: CreateModelDto): Promise<IResponse<unknown>> {
    const data = await this.modelsService.create(createModelDto);
    return { success: true, data, message: 'Model created successfully' };
  }

  @Get()
  async findAll(@Query() filterDto: FilterModelsDto): Promise<IResponse<unknown>> {
    const data = await this.modelsService.findAll(filterDto);
    return {
      success: true,
      data: data.items,
      meta: {
        page: data.page,
        limit: data.limit,
        total: data.total,
        totalPages: data.totalPages,
      },
    };
  }

  @Get('search')
  async search(@Query('q') query: string): Promise<IResponse<unknown>> {
    const data = await this.modelsService.search(query ?? '');
    return { success: true, data };
  }

  @Get('marketplace')
  async advancedSearch(@Query() filterDto: FilterModelsDto): Promise<IResponse<unknown>> {
    const data = await this.modelsService.advancedSearch(filterDto);
    return {
      success: true,
      data: data.items,
      meta: {
        page: data.page,
        limit: data.limit,
        total: data.total,
        totalPages: data.totalPages,
      },
    };
  }

  @Get('labs')
  async getLabs(): Promise<IResponse<string[]>> {
    const data = await this.modelsService.getLabs();
    return { success: true, data };
  }

  @Get('types')
  async getTypes(): Promise<IResponse<string[]>> {
    const data = await this.modelsService.getTypes();
    return { success: true, data };
  }

  @Get('compare')
  async compare(@Query('ids') ids: string): Promise<IResponse<unknown>> {
    const data = await this.modelsService.compare(
      ids.split(',').map((value) => value.trim()).filter(Boolean),
    );
    return { success: true, data };
  }

  @Get(':id')
  async findOne(@Param() { id }: IdParamDto): Promise<IResponse<unknown>> {
    const data = await this.modelsService.findOne(id);
    return { success: true, data };
  }

  @Patch(':id')
  async update(
    @Param() { id }: IdParamDto,
    @Body() updateModelDto: UpdateModelDto,
  ): Promise<IResponse<unknown>> {
    const data = await this.modelsService.update(id, updateModelDto);
    return { success: true, data, message: 'Model updated successfully' };
  }

  @Delete(':id')
  async remove(@Param() { id }: IdParamDto): Promise<IResponse<null>> {
    await this.modelsService.remove(id);
    return { success: true, message: 'Model deleted successfully' };
  }
}
