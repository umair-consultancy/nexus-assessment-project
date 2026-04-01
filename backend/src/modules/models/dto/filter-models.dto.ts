import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class FilterModelsDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @Type(() => String)
  @IsArray()
  @IsString({ each: true })
  labs?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @Type(() => String)
  @IsArray()
  @IsString({ each: true })
  types?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isTrending?: boolean;

  @ApiPropertyOptional({ enum: ['name', 'rating', 'priceStart', 'trendingOrder', 'createdAt'] })
  @IsOptional()
  @IsIn(['name', 'rating', 'priceStart', 'trendingOrder', 'createdAt'])
  sortBy?: 'name' | 'rating' | 'priceStart' | 'trendingOrder' | 'createdAt';

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
