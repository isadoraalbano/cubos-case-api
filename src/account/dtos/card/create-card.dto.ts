import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CardType } from '../../types/account-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({
    description:
      'Card type | virtual or physical (OBS: Only one physical card per account allowed)',
    example: 'virtual',
  })
  @IsString()
  @IsNotEmpty()
  type: CardType;

  @ApiProperty({ description: 'Card number', example: '5179 7447 8594 6978' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    description: 'Card CVV | must contain 3 digits',
    example: '245',
  })
  @IsString()
  @Length(3)
  cvv: string;
}
