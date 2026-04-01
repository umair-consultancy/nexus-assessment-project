import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResearchItemDocument = HydratedDocument<ResearchItem>;

@Schema({ timestamps: true, versionKey: false, collection: 'research' })
export class ResearchItem {
  @Prop({ required: true })
  date!: string;

  @Prop({ required: true, index: true })
  org!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  summary!: string;

  @Prop({ default: false })
  isTrending!: boolean;

  @Prop()
  badge?: string;

  @Prop()
  badgeBg?: string;

  @Prop()
  badgeColor?: string;
}

export const ResearchItemSchema = SchemaFactory.createForClass(ResearchItem);
