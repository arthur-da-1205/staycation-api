import { Injectable, UnauthorizedException } from '@nestjs/common';

import { GenericException } from '@common/exceptions/generic.exception';
import { hash, hashAreEqual } from '@libraries/helpers/encrypt.helper';
import { User } from '@models/user.model';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { AdminCreateDto } from '../dto/admin.dto';
import { jwt } from '@config/jwt.config';

@Injectable()
export class AdminAuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async createAdmin(dto: AdminCreateDto) {
    const { email } = dto;

    const existUser = await this.prismaService.user.findFirst({
      where: { email: email },
    });

    if (existUser) {
      throw new GenericException('User already exist');
    }

    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: await hash(dto.password),
        role: 'ADMIN',
      },
    });

    return { user };
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { email: email },
    });

    if (!user || !(await hashAreEqual(user.password, password))) {
      throw new UnauthorizedException('Username or password incorrect');
    }

    return user;
  }

  async createToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload, jwt),
    };
  }
}
