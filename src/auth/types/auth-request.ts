import { Request } from 'express';
import { PeopleEntity } from 'src/people/entities/people.entity';

export interface AuthRequest extends Request {
  user: PeopleEntity;
}
