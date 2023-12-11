import { Decimal } from '@prisma/client/runtime/library';
import { CreateTransactionDto } from '../dtos/transaction/create-transaction.dto';
import { GetAllTransactionsResponseDto } from '../dtos/transaction/get-all-transactions-response.dto';
import { AccountRepository } from '../repositories/account.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionType } from '../types/account-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async create(accountId: string, createTransactionDto: CreateTransactionDto) {
    let type;
    const updatedAt = new Date(Date.now());
    const { balance } = await this.accountRepository.findBalanceById(accountId);
    const value = Number(createTransactionDto.value) + Number(balance);
    if (Number(createTransactionDto.value) < 0) {
      type = 'debit';
      const sufficientBalance = value;
      if (sufficientBalance < 0) {
        throw new Error('Insufficient balance');
      }
      await this.accountRepository.updateBalance(
        accountId,
        new Decimal(value).toDecimalPlaces(2),
        updatedAt,
      );
      return await this.transactionRepository.create(
        createTransactionDto,
        type,
        accountId,
      );
    } else {
      type = 'credit';
      await this.accountRepository.updateBalance(
        accountId,
        new Decimal(value).toDecimalPlaces(2),
        updatedAt,
      );
      return await this.transactionRepository.create(
        createTransactionDto,
        type,
        accountId,
      );
    }
  }
  async findAll(
    accoundId: string,
    itemsPerPage: number,
    currentPage: number,
    type?: TransactionType,
    search?: string,
  ): Promise<GetAllTransactionsResponseDto> {
    const { transactions, pagination } =
      await this.transactionRepository.findAll(
        itemsPerPage,
        currentPage,
        accoundId,
        type,
        search,
      );
    return {
      transactions,
      pagination,
    };
  }
}
