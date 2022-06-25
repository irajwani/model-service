import { IsInt, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DrawCardsDto {
  @IsInt({})
  @Min(0)
  @Max(52)
  @ApiProperty({ name: 'count', description: 'Specify how many cards to draw' })
  count: number;
}
