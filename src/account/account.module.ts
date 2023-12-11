import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './services/account.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AccountRepository } from './repositories/account.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { CardRepository } from './repositories/card.repository';
import { TransactionService } from './services/transaction.service';
import { CardService } from './services/card.service';

@Module({
  imports: [PrismaModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    TransactionService,
    CardService,
    AccountRepository,
    TransactionRepository,
    CardRepository,
  ],
  exports: [AccountService],
})
export class AccountModule {}
