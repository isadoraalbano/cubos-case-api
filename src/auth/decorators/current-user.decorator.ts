import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthRequest } from '../types/auth-request';
import { PeopleEntity } from 'src/people/entities/people.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): PeopleEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
