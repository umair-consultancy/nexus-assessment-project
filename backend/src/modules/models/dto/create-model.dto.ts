import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class VariationDto {
  @ApiProperty()
  @IsString()
  id!: string;

  @ApiProperty()
  @IsString()
  icon!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  tag!: string;

  @ApiProperty()
  @IsString()
  desc!: string;

  @ApiProperty()
  @IsString()
  ctx!: string;

  @ApiProperty()
  @IsString()
  speed!: string;

  @ApiProperty()
  @IsString()
  price!: string;

  @ApiProperty()
  @IsString()
  updated!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  badge?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  benefits!: string[];
}

class ComparisonDto {
  @ApiProperty()
  @IsString()
  context!: string;

  @ApiProperty()
  @IsString()
  input!: string;

  @ApiProperty()
  @IsString()
  output!: string;

  @ApiProperty()
  @IsBoolean()
  multimodal!: boolean;

  @ApiProperty()
  @IsString()
  speed!: string;

  @ApiProperty()
  @IsString()
  bestFor!: string;
}

class PromptExampleDto {
  @ApiProperty()
  @IsString()
  useCase!: string;

  @ApiProperty()
  @IsString()
  prompt!: string;
}

export class CreateModelDto {
  @ApiProperty()
  @IsString()
  id!: string;

  @ApiProperty()
  @IsString()
  icon!: string;

  @ApiProperty()
  @IsString()
  bg!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  lab!: string;

  @ApiProperty()
  @IsString()
  org!: string;

  @ApiProperty()
  @IsString()
  desc!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags!: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  badge?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  reviews?: number;

  @ApiProperty()
  @IsString()
  price!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  types!: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  priceStart?: number;

  @ApiPropertyOptional({ type: [VariationDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariationDto)
  variations?: VariationDto[];

  @ApiPropertyOptional({ type: ComparisonDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ComparisonDto)
  comparison?: ComparisonDto;

  @ApiPropertyOptional({ type: [PromptExampleDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PromptExampleDto)
  promptExamples?: PromptExampleDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isTrending?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  trendingOrder?: number;
}
