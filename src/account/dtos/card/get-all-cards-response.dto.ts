import { PaginationResponseDto } from 'src/common/dtos/pagination-response.dto';
import { CardResponseDto } from './card-response.dto';

export class GetAllCardsResponseDto {
  cards: CardResponseDto[];
  pagination: PaginationResponseDto;
}
