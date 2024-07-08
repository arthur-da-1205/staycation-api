import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { OwnerCreateAccomodationInput } from '../dto/accomodation.dto';

@Injectable()
export class OwnerAccomodationService {
  constructor(private prismaService: PrismaService) {}
  async create(dto: OwnerCreateAccomodationInput) {
    const accomodation = await this.prismaService.accommodation.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        location: dto.location,
        type: dto.type,
        status: dto.status,
        owner_id: dto.owner_id,
      },
    });

    return accomodation;
  }
}
