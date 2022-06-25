import { CreateDeckDto } from './Validation/create-deck.dto';
import { Court, DeckTypes, Suits } from './Types/deck';
import Constants from '../../Common/constants';
import { IDeckGenerator } from './Types/deck-generator';

export default class DeckLogic {
  static generateDeck({ type }: CreateDeckDto): IDeckGenerator {
    return {
      suits: [Suits.SPADES, Suits.HEARTS, Suits.DIAMONDS, Suits.CLUBS],
      court: [Court.JACK, Court.QUEEN, Court.KING, Court.ACE],
      [Symbol.iterator]: function* () {
        const startAt =
          type === DeckTypes.FULL
            ? Constants.FULL_DECK_START
            : Constants.SHORT_DECK_START;

        for (const suit of this.suits) {
          for (let i = startAt; i <= 10; i++)
            yield { value: i, suit, code: i + suit.charAt(0) };
          for (const c of this.court)
            yield { value: c, suit, code: c.charAt(0) + suit.charAt(0) };
        }
      },
    };
  }

  static shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }
}
