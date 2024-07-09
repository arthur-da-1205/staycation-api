import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { OwnerCreateAccomodationInput } from '../dto/accommodation.dto';

@Injectable()
export class OwnerAccomodationService {
  constructor(private prismaService: PrismaService) {}

  private async generateId(): Promise<number> {
    const last = await this.prismaService.accommodation.findFirst({
      orderBy: { id: 'desc' },
    });

    if (last) {
      let nextId = last.id + 1;
      if (nextId % 30000 === 0) {
        nextId += 1;
      }
      return nextId;
    } else {
      return 30001;
    }
  }

  async create(dto: OwnerCreateAccomodationInput) {
    const customId = await this.generateId();

    const accomodation = await this.prismaService.accommodation.create({
      data: {
        id: customId,
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
