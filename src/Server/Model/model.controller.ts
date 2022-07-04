import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ModelService } from './model.service';
import { CreateModelDto } from './Validation/create-model.dto';
import { UpdateModelDto } from './Validation/update-model.dto';
import { IUpdateModelResponse } from './Types/update-model-response';
import { TResponse } from '../../Common/Types/response';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createModelDto: CreateModelDto) {
    return this.modelService.create(createModelDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.modelService.findOne(id);
  }

  @Patch(':id/deltas')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateModelDto,
    @Res() response: Response,
  ): Promise<TResponse<IUpdateModelResponse>> {
    await this.modelService.update(id, body);
    return response
      .status(HttpStatus.OK)
      .json({ message: `Successfully updated model with ID: ${id}` });
  }
}
