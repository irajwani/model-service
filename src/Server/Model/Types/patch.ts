import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';

export enum Operations {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

export class IPatch {
  @IsDefined()
  @IsEnum(Operations)
  op: Operations;

  @IsDefined()
  @IsString()
  path: string;

  @IsOptional()
  value: any;
}
