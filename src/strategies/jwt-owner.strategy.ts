import { TokenException } from '@common/exceptions/token.exception';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from '@prisma/prisma.service';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class JwtOwnerStrategy extends PassportStrategy(Strategy, 'jwt-owner') {
  constructor(
    config: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: config.get('JWT_SECRET'),
      secretOrKey: 'secret',
    });
  }

  // exposing payload
  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.prismaService.owner.findUnique({
      where: { id: payload.id },
    });
    if (!user) {
      return done(new TokenException('Invalid token supplied'), false);
    }

    return user;
  }
}
