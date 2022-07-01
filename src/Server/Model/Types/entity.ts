import { IAttribute } from './attribute';

export interface IEntity {
  name: string;
  attributes: IAttribute[];
}
