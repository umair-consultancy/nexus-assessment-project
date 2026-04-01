import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ChatMessageDto {
  @ApiProperty({ enum: ['user', 'assistant', 'system'] })
  @IsIn(['user', 'assistant', 'system'])
  role!: 'user' | 'assistant' | 'system';

  @ApiProperty()
  @IsString()
  content!: string;
}

export class CreateConversationDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  modelId!: string;

  @ApiPropertyOptional({ type: [ChatMessageDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  messages?: ChatMessageDto[];
}
