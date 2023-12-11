/* eslint-disable prettier/prettier */
import { Account, Prisma } from '@prisma/client';

export class AccountEntity implements Account {
  id: string;
  ownerId: string;
  account: string;
  balance: Prisma.Decimal;
  branch: string;
  createdAt: Date;
  updatedAt: Date;
}
