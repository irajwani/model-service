import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IModel, ModelSchema } from '../../Schemas/model.schema';
import { ModelRepository } from './model.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: IModel.name, schema: ModelSchema }]),
  ],
  controllers: [ModelController],
  providers: [ModelService, ModelRepository],
})
export class ModelModule {}
