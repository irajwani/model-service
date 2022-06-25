import { ICard } from './card';

export enum Suits {
  SPADES = 'SPADES',
  DIAMONDS = 'DIAMONDS',
  HEARTS = 'HEARTS',
  CLUBS = 'CLUBS',
}

export enum Court {
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
  ACE = 'ACE',
}

export enum DeckTypes {
  FULL = 'FULL',
  SHORT = 'SHORT',
}

export interface IDeck {
  _id?: string;
  type: DeckTypes;
  isShuffled: boolean;
  cards: ICard[];
  remaining: number;
}

export type TCreatedDeck = Omit<IDeck, 'cards'>;
