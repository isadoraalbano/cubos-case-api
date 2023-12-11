import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class TransactionResponseDto {
  @ApiProperty({ description: 'Transaction id' })
  id: string;

  @ApiProperty({ description: 'Transaction value' })
  value: Decimal;

  @ApiProperty({ description: 'Transaction description' })
  description: string;

  @ApiProperty({ description: 'Transaction creation date and time' })
  createdAt: Date;

  @ApiProperty({ description: 'Transaction update date and time' })
  updatedAt: Date;
}
