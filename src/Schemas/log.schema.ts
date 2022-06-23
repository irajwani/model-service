import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { LogTypes } from '../Server/Log/Types/log';

const { ObjectId } = MongooseSchema.Types;

@Schema({ timestamps: true })
export class Log {
  @Prop()
  text: string;

  @Prop()
  action: string;

  @Prop({ enum: LogTypes })
  type: string;

  // should reference Users collection
  @Prop()
  user: string;
}

export type LogDocument = Log & Document;
export const LogSchema = SchemaFactory.createForClass(Log);
