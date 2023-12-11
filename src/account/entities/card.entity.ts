import { Card } from '@prisma/client';

export class CardEntity implements Card {
  id: string;
  accountId: string;
  ownerId: string;
  cvv: string;
  number: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
