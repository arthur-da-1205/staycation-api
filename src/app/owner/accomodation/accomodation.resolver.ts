import { PaginationArgs } from '@common/args/paginate.args';
import { GenericException } from '@common/exceptions/generic.exception';
import { GqlAuthOwnerGuard } from '@common/gurads/gql.guard';
import {
  AccommodationModel,
  PaginateAccommodationModel,
} from '@models/accomodation.model';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@prisma/prisma.service';
import {
  OwnerAccommodationArgs,
  OwnerCreateAccomodationInput,
  OwnerUpdateAccommodationInput,
} from './dto/accomodation.dto';
import { Accomodation } from './entities/accomodation.entity';
import { OwnerAccomodationService } from './service/accomodation.service';

@UseGuards(GqlAuthOwnerGuard)
@Resolver()
export class OwnerAccomodationResolver {
  constructor(
    private readonly accomodationService: OwnerAccomodationService,
    private prismaService: PrismaService,
  ) {}

  @Mutation(() => Accomodation)
  async ownerCreateAccomodation(
    @Args('args')
    createAccomodationInput: OwnerCreateAccomodationInput,
  ) {
    const accomodation = await this.accomodationService.create(
      createAccomodationInput,
    );

    return accomodation;
  }

  @Query(() => PaginateAccommodationModel)
  async ownerAccommodationList(
    @Args() paginate: PaginationArgs,
    @Args({ nullable: true }) filter: OwnerAccommodationArgs,
  ): Promise<PaginateAccommodationModel> {
    if (paginate.per_page > 100) {
      throw new GenericException('Max. Limit 100');
    }

    const where = {
      ...(filter?.type && { type: filter.type }),
      ...(filter?.status && { status: filter.status }),
      ...(filter?.search && {
        OR: [
          { name: { contains: filter.search, mode: 'insensitive' } },
          { location: { contains: filter.search, mode: 'insensitive' } },
        ],
      }),
    };

    const [items, total_count] = await this.prismaService.$transaction([
      this.prismaService.accommodation.findMany({
        where: where as any,
        take: paginate.per_page,
        skip: (paginate.page - 1) * paginate.per_page,
        orderBy: { updatedAt: 'desc' },
      }),
      this.prismaService.accommodation.count({ where: where as any }),
    ]);

    const page_count = Math.ceil(total_count / paginate.per_page);

    return {
      items,
      meta: {
        total_count,
        page_count,
        page: paginate.page,
        per_page: paginate.per_page,
      },
    };
  }

  @Query(() => AccommodationModel)
  async ownerAccommodationDetail(@Args('id') id: number) {
    const accommodation = await this.prismaService.accommodation.findUnique({
      where: { id: id },
    });

    return accommodation;
  }

  @Mutation(() => AccommodationModel)
  async ownerUpdateAccommodation(
    @Args('id') id: number,
    @Args({ nullable: true }) data: OwnerUpdateAccommodationInput,
  ): Promise<AccommodationModel> {
    const accommodation = await this.prismaService.accommodation.findUnique({
      where: { id: id },
    });

    if (!accommodation) {
      throw new NotFoundException(`Accommodation with ID ${id} not found`);
    }

    const result = this.prismaService.accommodation.update({
      where: { id },
      data,
    });

    return result;
  }
}
