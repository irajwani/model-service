import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';
import { TValue } from '../Classes/Types/value';

export enum Operations {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

export class IPatch {
  @IsDefined()
  @IsEnum(Operations)
  op: Operations;

  // todo: add specific paths as enum
  @IsDefined()
  @IsString()
  path: string;

  @IsOptional()
  value?: TValue;
}
