import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: 'user', trim: true })
  role!: string;

  @Prop({ default: '👤' })
  avatar!: string;

  @Prop({ default: 'en', trim: true })
  preferredLang!: string;

  @Prop({ type: [String], default: [] })
  onboardingProfile!: string[];

  @Prop({ type: [String], default: [] })
  favoriteModels!: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
