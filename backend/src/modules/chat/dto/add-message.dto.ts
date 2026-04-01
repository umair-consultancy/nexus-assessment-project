import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class AddMessageDto {
  @ApiProperty({ enum: ['user', 'assistant', 'system'] })
  @IsIn(['user', 'assistant', 'system'])
  role!: 'user' | 'assistant' | 'system';

  @ApiProperty()
  @IsString()
  content!: string;
}
