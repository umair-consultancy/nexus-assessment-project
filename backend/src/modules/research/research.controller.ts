import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from '../../common/interfaces/response.interface';
import { FilterResearchDto } from './dto/filter-research.dto';
import { ResearchService } from './research.service';

@ApiTags('Research')
@Controller('research')
export class ResearchController {
  constructor(private readonly researchService: ResearchService) {}

  @Get('feed')
  async getFeed(@Query() filterDto: FilterResearchDto): Promise<IResponse<unknown>> {
    const data = await this.researchService.getFeed(filterDto);
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

  @Get('trending')
  async getTrending(): Promise<IResponse<unknown>> {
    const data = await this.researchService.getTrending();
    return { success: true, data };
  }
}
