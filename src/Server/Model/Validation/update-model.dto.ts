import { IPatch } from '../Types/patch';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import DeltasExample from '../Test/Stubs/deltas';

export class UpdateModelDto {
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @ApiProperty({
    name: 'deltas',
    description: 'Enter deltas as an array of operations',
    type: [IPatch],
    example: DeltasExample.S1T1.deltas,
  })
  deltas: IPatch[];
}
