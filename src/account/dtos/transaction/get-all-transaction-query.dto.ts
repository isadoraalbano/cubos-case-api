import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { TransactionType } from 'src/account/types/account-types';

export class GetAllTransactionQueryDto {
  @ApiProperty({
    description: 'Type of transaction | debit or credit',
    required: false,
  })
  @IsString()
  @IsOptional()
  type: TransactionType;

  @ApiProperty({
    description: 'Description of transaction',
    required: false,
  })
  @IsString()
  @IsOptional()
  search: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    description: 'Number of items that must be returned per page.',
    required: false,
    default: 10,
  })
  itemsPerPage: number = 10;

  @Transform(({ value }) => Number(value))
  @ApiProperty({
    description: 'Current page.',
    required: false,
    default: 1,
  })
  @IsOptional()
  currentPage: number = 1;
}
