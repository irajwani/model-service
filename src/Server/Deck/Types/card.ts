import { Suits } from './deck';

export interface ICard {
  value: string;
  suit: Suits;
  code: string;
}
