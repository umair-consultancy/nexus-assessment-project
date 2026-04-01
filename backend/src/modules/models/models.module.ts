import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { ModelEntity, ModelSchema } from './schemas/model.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelEntity.name, schema: ModelSchema }]),
  ],
  controllers: [ModelsController],
  providers: [ModelsService],
  exports: [ModelsService, MongooseModule],
})
export class ModelsModule {}
