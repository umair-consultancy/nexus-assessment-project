import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ _id: false, versionKey: false })
export class ChatMessage {
  @Prop({ required: true })
  role!: 'user' | 'assistant' | 'system';

  @Prop({ required: true })
  content!: string;

  @Prop({ required: true, default: () => new Date().toISOString() })
  timestamp!: string;
}

@Schema({ timestamps: true, versionKey: false, collection: 'conversations' })
export class Conversation {
  @Prop({ required: true, index: true })
  userId!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  modelId!: string;

  @Prop({ type: [ChatMessage], default: [] })
  messages!: ChatMessage[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
