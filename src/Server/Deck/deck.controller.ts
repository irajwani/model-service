import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { DeckService } from './deck.service';
import { CreateDeckDto } from './Validation/create-deck.dto';
import { UpdateDeckDto } from './Validation/update-deck.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TCreatedDeck } from './Types/deck';
import { DrawCardsDto } from './Validation/draw-cards.dto';

@ApiTags('Deck')
@Controller('deck')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  async create(
    @Body() createDeckDto: CreateDeckDto,
    @Res() response: Response,
  ) {
    return this.deckService.create(createDeckDto);
  }

  @Get()
  findAll() {
    return this.deckService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') deckId: string) {
    return this.deckService.findOne(deckId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deckService.remove(+id);
  }

  @Patch(':id')
  drawCards(@Param('id') id: string, @Body() drawCardsDto: DrawCardsDto) {
    return this.deckService.drawCards(id, drawCardsDto);
  }
}
