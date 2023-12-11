import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../types/user-payload';
import { UserJwtPayload } from '../types/user-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY_TOKEN,
    });
  }

  async validate(payload: UserPayload): Promise<UserJwtPayload> {
    return {
      id: payload.sub,
      name: payload.name,
      document: payload.document,
    };
  }
}
