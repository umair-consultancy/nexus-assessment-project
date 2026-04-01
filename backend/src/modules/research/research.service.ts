import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterResearchDto } from './dto/filter-research.dto';
import {
  ResearchItem,
  ResearchItemDocument,
} from './schemas/research-item.schema';

interface PaginatedResearch {
  items: ResearchItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class ResearchService {
  constructor(
    @InjectModel(ResearchItem.name)
    private readonly researchModel: Model<ResearchItemDocument>,
  ) {}

  async getFeed(filterDto: FilterResearchDto): Promise<PaginatedResearch> {
    const page = filterDto.page ?? 1;
    const limit = filterDto.limit ?? 10;
    const [items, total] = await Promise.all([
      this.researchModel
        .find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
      this.researchModel.countDocuments().exec(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getTrending(): Promise<ResearchItem[]> {
    return this.researchModel
      .find({ isTrending: true })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }
}
