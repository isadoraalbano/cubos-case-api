import { People } from '@prisma/client';

export class PeopleEntity implements People {
  id: string;
  name: string;
  document: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
