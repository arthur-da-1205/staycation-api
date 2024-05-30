import { TokenException } from '@common/exceptions/token.exception';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from '@prisma/prisma.service';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(config: ConfigService, private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  // exposing payload
  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) {
      return done(new TokenException('Invalid token supplied'), false);
    }

    return user;
  }
}
