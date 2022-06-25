import { ICard } from './card';

export interface IDeckGenerator extends Iterable<ICard> {
  suits: string[];
  court: string[];
}
