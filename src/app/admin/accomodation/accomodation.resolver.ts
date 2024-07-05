import { PaginationArgs } from '@common/args/paginate.args';
import { GenericException } from '@common/exceptions/generic.exception';
import { GqlAuthAdminGuard } from '@common/gurads/gql.guard';
import {
  AccommodationModel,
  PaginateAccommodationModel,
} from '@models/accomodation.model';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@prisma/prisma.service';
import {
  AdminAccommodationArgs,
  AdminCreateAccomodationDto,
  UpdateAccommodationInput,
} from './dto/accomodation.dto';
import { Accomodation } from './entities/accomodation.entity';
import { AdminAccomodationService } from './service/accomodation.service';

@UseGuards(GqlAuthAdminGuard)
@Resolver()
export class AdminAccomodationResolver {
  constructor(
    private readonly accomodationService: AdminAccomodationService,
    private prismaService: PrismaService,
  ) {}

  @Mutation(() => Accomodation)
  async createAccomodation(
    @Args('args')
    createAccomodationInput: AdminCreateAccomodationDto,
  ) {
    const accomodation = await this.accomodationService.create(
      createAccomodationInput,
    );

    return accomodation;
  }

  @Query(() => PaginateAccommodationModel)
  async adminAccommodationList(
    @Args() paginate: PaginationArgs,
    @Args({ nullable: true }) filter: AdminAccommodationArgs,
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
  async adminAccommodationDetail(@Args('id') id: number) {
    const accommodation = await this.prismaService.accommodation.findUnique({
      where: { id: id },
    });

    return accommodation;
  }

  @Mutation(() => AccommodationModel)
  async adminUpdateAccommodation(
    @Args('id') id: number,
    @Args({ nullable: true }) data: UpdateAccommodationInput,
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
