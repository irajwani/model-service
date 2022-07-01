import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './Validation/create-model.dto';
import { UpdateModelDto } from './Validation/update-model.dto';

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
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() body: UpdateModelDto) {
    return this.modelService.update(id, body);
  }
}
