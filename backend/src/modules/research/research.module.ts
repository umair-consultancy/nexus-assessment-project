import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResearchController } from './research.controller';
import { ResearchService } from './research.service';
import { ResearchItem, ResearchItemSchema } from './schemas/research-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ResearchItem.name, schema: ResearchItemSchema },
    ]),
  ],
  controllers: [ResearchController],
  providers: [ResearchService],
})
export class ResearchModule {}
