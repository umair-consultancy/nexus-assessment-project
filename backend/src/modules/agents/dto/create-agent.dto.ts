import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateAgentDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  modelId!: string;

  @ApiProperty()
  @IsString()
  instructions!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  capabilities!: string[];
}
