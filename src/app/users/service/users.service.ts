import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const { name, email, password } = dto;

    if (!name || !email || !password) {
      throw new BadRequestException('Missing required fields!');
    }

    try {
      const SALT = 10;
      const hash = await bcrypt.hash(password, SALT);

      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        throw new ConflictException('User already exists');
      }

      const result = await this.prismaService.user.create({
        data: {
          name,
          email,
          password: hash,

        },
      });

      return { ...result };
    } catch (error) {
      throw error;
    }
  }
}
