import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IEntity } from '../Server/Model/Types/entity';
import { IAssociation } from '../Server/Model/Types/association';

@Schema({ collection: 'models', timestamps: true })
export class IModel {
  @Prop({ unique: true })
  name: string;

  @Prop()
  entities: IEntity[];

  @Prop()
  associations: IAssociation[];
}

export type ModelDocument = IModel & Document;
export const ModelSchema = SchemaFactory.createForClass(IModel);
