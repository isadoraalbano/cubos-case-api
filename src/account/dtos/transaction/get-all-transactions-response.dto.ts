import { PaginationResponseDto } from 'src/common/dtos/pagination-response.dto';
import { TransactionResponseDto } from './transaction-response.dto';

export class GetAllTransactionsResponseDto {
  transactions: TransactionResponseDto[];
  pagination: PaginationResponseDto;
}
