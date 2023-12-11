import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: 'Transaction value', example: 250.55 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  value: Prisma.Decimal;

  @ApiProperty({
    description: 'Transaction description',
    example: 'Home office assistance payment',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
