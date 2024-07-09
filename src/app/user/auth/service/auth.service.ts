import { GenericException } from '@common/exceptions/generic.exception';
import { jwt } from '@config/jwt.config';
import { hash, hashAreEqual } from '@libraries/helpers/encrypt.helper';
import { UserModel } from '@models/user.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { UserRegisterInput } from '../dto/user.dto';

@Injectable()
export class UserAuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async generateUserId(): Promise<number> {
    const lastUser = await this.prismaService.user.findFirst({
      orderBy: { id: 'desc' },
    });

    if (lastUser) {
      let nextId = lastUser.id + 1;
      if (nextId % 10000 === 0) {
        nextId += 1;
      }
      return nextId;
    } else {
      return 20001;
    }
  }

  async createUser(dto: UserRegisterInput) {
    const { email } = dto;
    const customId = await this.generateUserId();

    const existUser = await this.prismaService.user.findFirst({
      where: { email: email },
    });

    if (existUser) {
      throw new GenericException('User already exist');
    }

    const user = await this.prismaService.user.create({
      data: {
        id: customId,
        email: dto.email,
        name: dto.name,
        password: await hash(dto.password),
      },
    });

    return { user };
  }

  async validate(email: string, password: string): Promise<UserModel> {
    const user = await this.prismaService.user.findFirst({
      where: { email: email },
    });

    if (!user || !(await hashAreEqual(user.password, password))) {
      throw new UnauthorizedException('Username or password incorrect');
    }

    return user;
  }

  async createToken(user: UserModel) {
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
