import { Transaction } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class TransactionEntity implements Transaction {
  id: string;
  accountId: string;
  type: string;
  value: Decimal;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
