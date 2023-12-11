import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { Balance } from '../types/account-types';
import { AccountResponseDto } from '../dtos/account/account-response.dto';
import { CreateAccountDto } from '../dtos/account/create-account.dto';
import { GetAllAccountsResponseDto } from '../dtos/account/get-all-accounts-response.dto';

@Injectable()
export class AccountService {
  constructor(private readonly repository: AccountRepository) {}

  async findBalance(id: string): Promise<Balance> {
    return await this.repository.findBalanceById(id);
  }

  async findAllAccounts(
    itemsPerPage: number,
    currentPage: number,
    ownerId: string,
  ): Promise<GetAllAccountsResponseDto> {
    return await this.repository.findAll(ownerId, itemsPerPage, currentPage);
  }

  async createAccount(
    createAccountDto: CreateAccountDto,
    ownerId: string,
  ): Promise<AccountResponseDto> {
    const formatedAccount = this.formatedAccount(createAccountDto.account);
    const account = await this.repository.create(
      {
        ...createAccountDto,
        account: formatedAccount,
      },
      ownerId,
    );
    return account;
  }

  private formatedAccount(account: string): string {
    const formatedAccount = `${account.substring(
      0,
      account.length - 1,
    )}-${account.substring(account.length - 1)}`;
    return formatedAccount;
  }
}
