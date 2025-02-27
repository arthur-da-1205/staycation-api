import { Injectable, UnauthorizedException } from '@nestjs/common';

import { GenericException } from '@common/exceptions/generic.exception';
import { jwt } from '@config/jwt.config';
import { hash, hashAreEqual } from '@libraries/helpers/encrypt.helper';
import { OwnerModel } from '@models/owner.model';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { OwnerRegisterInput } from '../dto/owner.dto';

@Injectable()
export class OwnerAuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private async generateOwnerId(): Promise<number> {
    const lastOwner = await this.prismaService.owner.findFirst({
      orderBy: { id: 'desc' },
    });

    if (lastOwner) {
      let nextId = lastOwner.id + 1;
      if (nextId % 10000 === 0) {
        nextId += 1;
      }
      return nextId;
    } else {
      return 10001;
    }
  }

  async createOwner(dto: OwnerRegisterInput) {
    const { email } = dto;
    const customId = await this.generateOwnerId();

    const existUser = await this.prismaService.owner.findFirst({
      where: { email: email },
    });

    if (existUser) {
      throw new GenericException('User already exist');
    }

    const user = await this.prismaService.owner.create({
      data: {
        id: customId,
        email: dto.email,
        name: dto.name,
        password: await hash(dto.password),
      },
    });

    return { user };
  }

  async validate(email: string, password: string): Promise<OwnerModel> {
    const user = await this.prismaService.owner.findFirst({
      where: { email: email },
    });

    if (!user || !(await hashAreEqual(user.password, password))) {
      throw new UnauthorizedException('Username or password incorrect');
    }

    return user;
  }

  async createToken(user: OwnerModel) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload, jwt),
    };
  }
}
