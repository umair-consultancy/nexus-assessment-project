import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterModelsDto } from './dto/filter-models.dto';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ModelDocument, ModelEntity } from './schemas/model.schema';

interface PaginatedModels {
  items: ModelEntity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class ModelsService {
  constructor(
    @InjectModel(ModelEntity.name)
    private readonly modelModel: Model<ModelDocument>,
  ) {}

  async create(createModelDto: CreateModelDto): Promise<ModelEntity> {
    return this.modelModel.create(createModelDto);
  }

  async findAll(filterDto: FilterModelsDto): Promise<PaginatedModels> {
    const page = filterDto.page ?? 1;
    const limit = filterDto.limit ?? 10;
    const query = this.buildQuery(filterDto);
    const sortBy = filterDto.sortBy ?? 'name';
    const sortOrder = filterDto.sortOrder === 'desc' ? -1 : 1;

    const [items, total] = await Promise.all([
      this.modelModel
        .find(query)
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
      this.modelModel.countDocuments(query).exec(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async search(term: string): Promise<ModelEntity[]> {
    return this.modelModel
      .find({
        $or: [
          { name: { $regex: term, $options: 'i' } },
          { desc: { $regex: term, $options: 'i' } },
          { org: { $regex: term, $options: 'i' } },
          { lab: { $regex: term, $options: 'i' } },
          { tags: { $elemMatch: { $regex: term, $options: 'i' } } },
        ],
      })
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<ModelEntity> {
    const model = await this.modelModel.findById(id).lean().exec();
    if (!model) {
      throw new NotFoundException('Model not found');
    }
    return model;
  }

  async update(id: string, updateModelDto: UpdateModelDto): Promise<ModelEntity> {
    const model = await this.modelModel
      .findByIdAndUpdate(id, updateModelDto, { new: true })
      .lean()
      .exec();
    if (!model) {
      throw new NotFoundException('Model not found');
    }
    return model;
  }

  async remove(id: string): Promise<void> {
    const result = await this.modelModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Model not found');
    }
  }

  async getLabs(): Promise<string[]> {
    return this.modelModel.distinct('lab').exec();
  }

  async getTypes(): Promise<string[]> {
    return this.modelModel.distinct('types').exec();
  }

  async compare(ids: string[]): Promise<ModelEntity[]> {
    return this.modelModel.find({ id: { $in: ids } }).lean().exec();
  }

  async advancedSearch(filterDto: FilterModelsDto): Promise<PaginatedModels> {
    return this.findAll(filterDto);
  }

  private buildQuery(filterDto: FilterModelsDto): Record<string, unknown> {
    const query: Record<string, unknown> = {};

    if (filterDto.search) {
      query.$or = [
        { name: { $regex: filterDto.search, $options: 'i' } },
        { desc: { $regex: filterDto.search, $options: 'i' } },
        { org: { $regex: filterDto.search, $options: 'i' } },
        { lab: { $regex: filterDto.search, $options: 'i' } },
        { tags: { $elemMatch: { $regex: filterDto.search, $options: 'i' } } },
      ];
    }

    if (filterDto.labs?.length) {
      query.lab = { $in: filterDto.labs };
    }

    if (filterDto.types?.length) {
      query.types = { $in: filterDto.types };
    }

    if (typeof filterDto.minPrice === 'number' || typeof filterDto.maxPrice === 'number') {
      const priceRange: { $gte?: number; $lte?: number } = {};
      if (typeof filterDto.minPrice === 'number') {
        priceRange.$gte = filterDto.minPrice;
      }
      if (typeof filterDto.maxPrice === 'number') {
        priceRange.$lte = filterDto.maxPrice;
      }
      query.priceStart = priceRange;
    }

    if (typeof filterDto.isFeatured === 'boolean') {
      query.isFeatured = filterDto.isFeatured;
    }

    if (typeof filterDto.isTrending === 'boolean') {
      query.isTrending = filterDto.isTrending;
    }

    return query;
  }
}
