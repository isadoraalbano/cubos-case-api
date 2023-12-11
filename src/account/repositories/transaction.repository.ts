import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from '../dtos/transaction/create-transaction.dto';
import { TransactionType } from '../types/account-types';
import { Injectable } from '@nestjs/common';
import { TransactionResponseDto } from '../dtos/transaction/transaction-response.dto';
import { GetAllTransactionsResponseDto } from '../dtos/transaction/get-all-transactions-response.dto';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    type: string,
    accountId: string,
  ): Promise<TransactionResponseDto> {
    return this.prisma.transaction.create({
      data: {
        ...createTransactionDto,
        type,
        accountId,
      },
      select: {
        id: true,
        value: true,
        description: true,
        accountId: false,
        type: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll(
    itemsPerPage: number,
    currentPage: number,
    accountId: string,
    type?: TransactionType,
    description?: string,
  ): Promise<GetAllTransactionsResponseDto> {
    const [transactions, totalCount] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where: {
          accountId,
          type,
          description,
        },
        select: {
          id: true,
          accountId: false,
          description: true,
          type: false,
          value: true,
          createdAt: true,
          updatedAt: true,
        },
        skip: currentPage * itemsPerPage - itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.transaction.count(),
    ]);
    const pageCount = Math.ceil(totalCount / itemsPerPage);
    return {
      transactions,
      pagination: {
        itemsPerPage,
        pageCount,
        currentPage,
        totalCount,
      },
    };
  }
}
