import { ApiProperty } from '@nestjs/swagger';

export class CardResponseDto {
  @ApiProperty({ description: 'Card id' })
  id: string;

  @ApiProperty({ description: 'Card cvv' })
  cvv: string;

  @ApiProperty({ description: 'Card number' })
  number: string;

  @ApiProperty({
    description:
      'Card type | virtual or physical (OBS: Only one physical card per account allowed)',
  })
  type: string;

  @ApiProperty({
    description: 'Card creation date and time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'date and time of card update',
  })
  updatedAt: Date;
}
