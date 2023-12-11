import { Decimal } from '@prisma/client/runtime/library';

export type CardType = 'physical' | 'virtual';

export type Balance = {
  balance: Decimal;
};

export type TransactionType = 'credit' | 'debit';
