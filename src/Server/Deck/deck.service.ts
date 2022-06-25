import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDeckDto } from './Validation/create-deck.dto';
import { UpdateDeckDto } from './Validation/update-deck.dto';
import { IDeck } from './Types/deck';
import { ICard } from './Types/card';
import DeckLogic from './deck.logic';
import {
  DeckNotFoundException,
  InternalServerException,
  InvalidDrawException,
} from '../../Common/Errors';

import { Deck, DeckDocument } from '../../Schemas/deck.schema';

import { DrawCardsDto } from './Validation/draw-cards.dto';

@Injectable()
export class DeckService {
  constructor(
    @InjectModel(Deck.name) private deckRepository: Model<DeckDocument>,
  ) {}

  public async create({ type, isShuffled }: CreateDeckDto): Promise<IDeck> {
    const cards = [...DeckLogic.generateDeck({ type })];
    if (isShuffled) DeckLogic.shuffle(cards);
    const deck = {
      type,
      isShuffled,
      cards,
      remaining: cards.length,
    };
    try {
      const newDeck = await this.deckRepository.create(deck);
      return newDeck;
    } catch (e) {
      throw new InternalServerException();
    }
  }

  findAll() {
    return `This action returns all deck`;
  }

  async findOne(_id: string): Promise<IDeck> {
    try {
      const deck = await this.deckRepository.findById(_id).lean();
      return deck;
    } catch (e) {
      throw new DeckNotFoundException();
    }
  }

  async drawCards(_id: string, { count }: DrawCardsDto): Promise<ICard[]> {
    const deck: IDeck = await this.deckRepository.findById(_id).lean();
    if (!deck) throw new DeckNotFoundException();
    if (deck.remaining < 1) return [];
    if (count > deck.remaining) throw new InvalidDrawException();
    try {
      await this.deckRepository.updateOne(
        { _id },
        {
          $push: {
            cards: {
              $each: [],
              $slice: count - deck.remaining,
            },
          },
          remaining: deck.remaining - count,
        },
      );
      return deck.cards.slice(0, count);
    } catch (e) {
      throw new InternalServerException();
    }
  }

  update(id: string, updateDeckDto: UpdateDeckDto) {
    return `This action updates a #${id} deck`;
  }

  remove(id: number) {
    return `This action removes a #${id} deck`;
  }
}
