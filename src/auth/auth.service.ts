import { Injectable } from '@nestjs/common';
import { UserPayload } from './types/user-payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './types/user-token';
import { PeopleService } from 'src/people/people.service';
import { PeopleResponseDto } from 'src/people/dtos/people-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: PeopleResponseDto): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      document: user.document,
      name: user.name,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return {
      access_token: accessToken,
    };
  }

  async validateUser(document: string, password: string) {
    const people = await this.peopleService.validPeopleInformation(
      document,
      password,
    );
    return {
      id: people.id,
      name: people.name,
      document: people.document,
    };
  }
}
