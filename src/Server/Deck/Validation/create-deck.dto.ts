import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { DeckTypes } from '../Types/deck';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeckDto {
  @IsEnum(DeckTypes)
  @ApiProperty({ enum: DeckTypes, enumName: 'deck type' })
  type: DeckTypes;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    name: 'isShuffled',
    description: 'choose to create a shuffled deck or not',
  })
  isShuffled?: boolean;
}
