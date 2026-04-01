import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ModelDocument = HydratedDocument<ModelEntity>;

@Schema({ _id: false, versionKey: false })
export class Variation {
  @Prop({ required: true })
  id!: string;

  @Prop({ required: true })
  icon!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  tag!: string;

  @Prop({ required: true })
  desc!: string;

  @Prop({ required: true })
  ctx!: string;

  @Prop({ required: true })
  speed!: string;

  @Prop({ required: true })
  price!: string;

  @Prop({ required: true })
  updated!: string;

  @Prop()
  badge?: string;

  @Prop({ type: [String], default: [] })
  benefits!: string[];
}

@Schema({ _id: false, versionKey: false })
export class Comparison {
  @Prop({ required: true })
  context!: string;

  @Prop({ required: true })
  input!: string;

  @Prop({ required: true })
  output!: string;

  @Prop({ required: true })
  multimodal!: boolean;

  @Prop({ required: true })
  speed!: string;

  @Prop({ required: true })
  bestFor!: string;
}

@Schema({ _id: false, versionKey: false })
export class PromptExample {
  @Prop({ required: true })
  useCase!: string;

  @Prop({ required: true })
  prompt!: string;
}

@Schema({ timestamps: true, versionKey: false, collection: 'models' })
export class ModelEntity {
  @Prop({ required: true, unique: true, index: true })
  id!: string;

  @Prop({ required: true })
  icon!: string;

  @Prop({ required: true })
  bg!: string;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true, index: true })
  lab!: string;

  @Prop({ required: true, trim: true })
  org!: string;

  @Prop({ required: true })
  desc!: string;

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop()
  badge?: string;

  @Prop()
  rating?: number;

  @Prop()
  reviews?: number;

  @Prop({ required: true })
  price!: string;

  @Prop({ type: [String], default: [] })
  types!: string[];

  @Prop()
  priceStart?: number;

  @Prop({ type: [Variation], default: [] })
  variations!: Variation[];

  @Prop({ type: Comparison, required: false })
  comparison?: Comparison;

  @Prop({ type: [PromptExample], default: [] })
  promptExamples!: PromptExample[];

  @Prop({ default: false })
  isFeatured!: boolean;

  @Prop({ default: false })
  isTrending!: boolean;

  @Prop()
  trendingOrder?: number;
}

export const ModelSchema = SchemaFactory.createForClass(ModelEntity);
ModelSchema.index({ name: 'text', desc: 'text', org: 'text', tags: 'text', lab: 'text' });
