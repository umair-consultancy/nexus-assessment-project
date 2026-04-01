import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AgentDocument = HydratedDocument<Agent>;

@Schema({ timestamps: true, versionKey: false, collection: 'agents' })
export class Agent {
  @Prop({ required: true, index: true })
  userId!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  modelId!: string;

  @Prop({ required: true })
  instructions!: string;

  @Prop({ type: [String], default: [] })
  capabilities!: string[];
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
