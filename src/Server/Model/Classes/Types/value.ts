import { IEntity } from '../../Types/entity';
import { IAttribute } from '../../Types/attribute';
import { IAssociation } from '../../Types/association';

export type TValue =
  | IEntity
  | IAttribute
  | IAttribute[]
  | IAssociation
  | string;
