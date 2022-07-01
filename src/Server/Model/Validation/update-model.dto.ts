import { IPatch } from '../Types/patch';
import { ArrayUnique, IsArray, IsDefined } from 'class-validator';

export class UpdateModelDto {
  @IsDefined()
  @IsArray()
  @ArrayUnique()
  deltas: IPatch[];
}
