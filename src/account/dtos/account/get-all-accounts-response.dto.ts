import { PaginationResponseDto } from 'src/common/dtos/pagination-response.dto';
import { AccountResponseDto } from './account-response.dto';

export class GetAllAccountsResponseDto {
  accounts: AccountResponseDto[];
  pagination: PaginationResponseDto;
}
