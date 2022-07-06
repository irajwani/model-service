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
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  IsDefined,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import Constants from '../../../Common/constants';
import { IEntity } from '../Types/entity';
import { IAssociation } from '../Types/association';
const { MODEL_NAME_MAX_LENGTH, MODEL_NAME_MIN_LENGTH } = Constants;
import EntitiesExample from '../Test/Stubs/entity';
import AssociationsExample from '../Test/Stubs/association';

@ValidatorConstraint()
export class IsValidAssociation implements ValidatorConstraintInterface {
  public async validate(
    associations: IAssociation[],
    args: ValidationArguments,
  ) {
    if (
      associations.find(
        (association) => association.source === association.target,
      )
    )
      return false;
    return true;
  }
}

export class CreateModelDto {
  @ApiProperty({
    name: 'name',
    description: 'Model name',
    example: 'Evil Corp.',
    type: String,
    minLength: MODEL_NAME_MIN_LENGTH,
    maxLength: MODEL_NAME_MAX_LENGTH,
  })
  @IsDefined()
  @IsString()
  @MinLength(MODEL_NAME_MIN_LENGTH)
  @MaxLength(MODEL_NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({
    name: 'entities',
    description: 'Entities within model',
    type: Array,
    example: Object.values(EntitiesExample.S1T2),
  })
  @IsDefined()
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
    example: Object.values(AssociationsExample.S1T2),
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayUnique(
    (association: IAssociation) => association.source && association.target,
  )
  @Validate(IsValidAssociation, {
    message: 'Association must have distinct source and target values',
  })
  associations: IAssociation[];
}

export interface ICreateModelResponse {
  _id: string;
}
