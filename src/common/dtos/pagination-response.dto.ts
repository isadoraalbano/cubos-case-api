import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto {
  @ApiProperty({
    description: 'Total of items that satisfy the search.',
  })
  totalCount: number;

  @ApiProperty({
    description: 'Number of items that must be returned per page.',
  })
  itemsPerPage: number;

  @ApiProperty({ description: 'Current page.' })
  currentPage: number;

  @ApiProperty({ description: 'Total pages according to the search.' })
  pageCount: number;
}
