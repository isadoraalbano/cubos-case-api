import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
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
