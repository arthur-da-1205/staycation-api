import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { OwnerCreatePropertyInput } from '../dto/property.dto';

@Injectable()
export class OwnerPropertyService {
  constructor(private prismaService: PrismaService) {}

  private async generateId(): Promise<number> {
    const last = await this.prismaService.property.findFirst({
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

  async create(dto: OwnerCreatePropertyInput) {
    const customId = await this.generateId();

    const accomodation = await this.prismaService.property.create({
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
