import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AccountService } from './services/account.service';
import { CreateAccountDto } from './dtos/account/create-account.dto';
import { CreateCardDto } from './dtos/card/create-card.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { GetAllTransactionQueryDto } from './dtos/transaction/get-all-transaction-query.dto';
import { TransactionService } from './services/transaction.service';
import { CardService } from './services/card.service';
import { CreateTransactionDto } from './dtos/transaction/create-transaction.dto';
import { AccountResponseDto } from './dtos/account/account-response.dto';
import { GetAllAccountsResponseDto } from './dtos/account/get-all-accounts-response.dto';
import { GetAllCardsResponseDto } from './dtos/card/get-all-cards-response.dto';
import { CardResponseDto } from './dtos/card/card-response.dto';
import { Balance } from './types/account-types';
import { GetAllTransactionsResponseDto } from './dtos/transaction/get-all-transactions-response.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { PeopleResponseDto } from 'src/people/dtos/people-response.dto';
import { TransactionResponseDto } from './dtos/transaction/transaction-response.dto';

@ApiBearerAuth()
@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly transactionService: TransactionService,
    private readonly cardService: CardService,
  ) {}

  @ApiCreatedResponse({
    type: AccountResponseDto,
  })
  @ApiBody({
    type: CreateAccountDto,
  })
  @ApiOperation({
    description: 'Endpoint to create people account',
  })
  @ApiUnauthorizedResponse({
    description: 'User does not have authorization to access',
  })
  @ApiBadRequestResponse({ description: 'Invalid informations' })
  @Post()
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
    @CurrentUser() user: PeopleResponseDto,
  ): Promise<AccountResponseDto> {
    return await this.accountService.createAccount(createAccountDto, user.id);
  }

  @ApiOperation({
    description: 'Endpoint to create people account',
  })
  @ApiUnauthorizedResponse({
    description: 'User does not have authorization to access',
  })
  @ApiOkResponse({
    description: 'Acccounts returned successfully',
    type: GetAllAccountsResponseDto,
  })
  @Get()
  async findAllAccounts(
    @CurrentUser() user: PeopleResponseDto,
    @Query() query: PaginationQueryDto,
  ): Promise<GetAllAccountsResponseDto> {
    return await this.accountService.findAllAccounts(
      query.itemsPerPage,
      query.currentPage,
      user.id,
    );
  }

  @ApiCreatedResponse({
    type: CardResponseDto,
  })
  @ApiBody({
    type: CreateCardDto,
  })
  @ApiOperation({
    description: 'Endpoint to create account card',
  })
  @ApiUnauthorizedResponse({
    description: 'User does not have authorization to access',
  })
  @ApiBadRequestResponse({ description: 'Invalid informations' })
  @Post()
  @Post(':accountId/cards')
  async createCard(
    @CurrentUser() user: PeopleResponseDto,
    @Param('accountId') accountId: string,
    @Body() createCardDto: CreateCardDto,
  ): Promise<CardResponseDto> {
    return await this.cardService.create(createCardDto, accountId, user.id);
  }

  @ApiOperation({
    description: 'Endpoint to find all account cards',
  })
  @ApiUnauthorizedResponse({
    description: 'User does not have authorization to access',
  })
  @ApiOkResponse({
    description: 'Cards returned successfully',
    type: GetAllCardsResponseDto,
  })
  @Get(':accountId/cards')
  async findAllAccountCards(
    @Param('accountId') accountId: string,
    @Query() query: PaginationQueryDto,
  ): Promise<GetAllCardsResponseDto> {
    return await this.cardService.findAllByAccount(
      accountId,
      query.itemsPerPage,
      query.currentPage,
    );
  }

  @ApiOperation({
    description: 'Endpoint to find all people cards',
  })
  @ApiUnauthorizedResponse({
    description: 'User does not have authorization to access',
  })
  @ApiOkResponse({
    description: 'Cards returned successfully',
    type: GetAllCardsResponseDto,
  })
  @Get('/cards')
  async findAllCards(
    @CurrentUser() user: PeopleResponseDto,
    @Query() query: PaginationQueryDto,
  ): Promise<GetAllCardsResponseDto> {
    return await this.cardService.findAllByOwnerId(
      query.itemsPerPage,
      query.currentPage,
      user.id,
    );
  }

  @ApiCreatedResponse({
    type: TransactionResponseDto,
  })
  @ApiBody({
    type: CreateTransactionDto,
  })
  @ApiOperation({
    description: 'Endpoint to create account transaction',
  })
  @ApiUnauthorizedResponse({
    description: 'User does not have authorization to access',
  })
  @ApiBadRequestResponse({ description: 'Invalid informations' })
  @Post(':accountId/transactions')
  createTransaction(
    @Param('accountId') accountId: string,
    @Body() createTransationDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(accountId, createTransationDto);
  }

  @ApiOperation({
    description: 'Endpoint to find all account transactions',
  })
  @ApiUnauthorizedResponse({
    description: 'User does not have authorization to access',
  })
  @ApiOkResponse({
    description: 'Cards returned successfully',
    type: GetAllTransactionsResponseDto,
  })
  @Get(':accountId/transactions')
  async findAllTransactions(
    @Param('accountId') accountId: string,
    @Query() query: GetAllTransactionQueryDto,
  ): Promise<GetAllTransactionsResponseDto> {
    return this.transactionService.findAll(
      accountId,
      query.itemsPerPage,
      query.currentPage,
      query.type,
      query.search,
    );
  }

  @ApiOperation({
    description: 'Endpoint to return account balance',
  })
  @ApiUnauthorizedResponse({
    description: 'User does not have authorization to access',
  })
  @ApiOkResponse({
    description: 'Cards returned successfully',
  })
  @Get(':accountId/balance')
  async findBalance(@Param('accountId') accountId: string): Promise<Balance> {
    return await this.accountService.findBalance(accountId);
  }
}
