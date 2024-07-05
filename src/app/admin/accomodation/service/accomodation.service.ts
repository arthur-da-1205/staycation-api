import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { AdminCreateAccomodationDto } from '../dto/accomodation.dto';

@Injectable()
export class AdminAccomodationService {
  constructor(private prismaService: PrismaService) {}
  async create(dto: AdminCreateAccomodationDto) {
    const accomodation = await this.prismaService.accommodation.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        location: dto.location,
        type: dto.type,
      },
    });

    return accomodation;
  }
}
