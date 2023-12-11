import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from '../dtos/account/create-account.dto';
import { Injectable } from '@nestjs/common';
import { GetAllAccountsResponseDto } from '../dtos/account/get-all-accounts-response.dto';
import { AccountResponseDto } from '../dtos/account/account-response.dto';
import { Balance } from '../types/account-types';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createAccountDto: CreateAccountDto,
    ownerId: string,
  ): Promise<AccountResponseDto> {
    return await this.prisma.account.create({
      data: {
        ...createAccountDto,
        ownerId,
      },
      select: {
        id: true,
        balance: false,
        branch: true,
        account: true,
        ownerId: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll(
    ownerId: string,
    itemsPerPage: number,
    currentPage: number,
  ): Promise<GetAllAccountsResponseDto> {
    const [accounts, totalCount] = await this.prisma.$transaction([
      this.prisma.account.findMany({
        where: {
          ownerId,
        },
        select: {
          id: true,
          balance: false,
          branch: true,
          account: true,
          ownerId: false,
          createdAt: true,
          updatedAt: true,
        },
        skip: currentPage * itemsPerPage - itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.account.count({
        where: {
          ownerId,
        },
      }),
    ]);
    const pageCount = Math.ceil(totalCount / itemsPerPage);
    return {
      accounts,
      pagination: {
        itemsPerPage,
        pageCount,
        currentPage,
        totalCount,
      },
    };
  }

  async findBalanceById(id: string): Promise<Balance> {
    const { balance } = await this.prisma.account.findUnique({
      where: {
        id,
      },
    });

    return {
      balance: balance.toDecimalPlaces(2),
    };
  }

  async updateBalance(
    id: string,
    value: Decimal,
    updatedAt: Date,
  ): Promise<void> {
    await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        balance: value.toDecimalPlaces(2),
        updatedAt,
      },
    });
  }
}
