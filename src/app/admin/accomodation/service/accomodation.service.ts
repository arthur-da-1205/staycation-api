import { Injectable } from '@nestjs/common';
import { CreateAccomodationInput } from '../dto/create-accomodation.input';
import { UpdateAccomodationInput } from '../dto/update-accomodation.input';
import { PrismaService } from '@prisma/prisma.service';
import { AdminCreateAccomodationDto } from '../dto/accomodation.dto';

@Injectable()
export class AccomodationService {
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

  findAll() {
    return `This action returns all accomodation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accomodation`;
  }

  update(id: number, updateAccomodationInput: UpdateAccomodationInput) {
    return `This action updates a #${id} accomodation`;
  }

  remove(id: number) {
    return `This action removes a #${id} accomodation`;
  }
}
