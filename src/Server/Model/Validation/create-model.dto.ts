import {
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import Constants from '../../../Common/constants';
import { IEntity } from '../Types/entity';
import { IAssociation } from '../Types/association';
const { MODEL_NAME_MAX_LENGTH, MODEL_NAME_MIN_LENGTH } = Constants;
import EntitiesExample from './Examples/entity';
import AssociationsExample from './Examples/association';

export class CreateModelDto {
  @ApiProperty({
    name: 'name',
    description: 'Model name',
    example: 'Library',
    type: String,
    minLength: MODEL_NAME_MIN_LENGTH,
    maxLength: MODEL_NAME_MAX_LENGTH,
  })
  @IsString()
  @MinLength(MODEL_NAME_MIN_LENGTH)
  @MaxLength(MODEL_NAME_MAX_LENGTH)
  // @Matches() todo: regexp check
  name: string;

  @ApiProperty({
    name: 'entities',
    description: 'Entities within model',
    type: Array,
    example: Object.values(EntitiesExample),
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayUnique((entity: IEntity) => entity.name)
  entities: IEntity[];

  @ApiProperty({
    name: 'associations',
    description: 'Associations between entities of model',
    type: Array,
    example: Object.values(AssociationsExample),
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayUnique(
    (association: IAssociation) => association.source && association.target,
  )
  associations: IAssociation[];
  //  source != target
}