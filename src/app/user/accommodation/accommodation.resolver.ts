import { PaginationArgs } from '@common/args/paginate.args';
import { GenericException } from '@common/exceptions/generic.exception';
import { GqlAuthGuard } from '@common/gurads/gql.guard';
import {
  AccommodationModel,
  PaginateAccommodationModel,
} from '@models/accomodation.model';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@prisma/prisma.service';
import { UserAccommodationArgs } from './dto/accommodation.dto';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserAccommodationResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => PaginateAccommodationModel)
  async userAccommodationList(
    @Args() paginate: PaginationArgs,
    @Args({ nullable: true }) filter: UserAccommodationArgs,
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
  async userAccommodationDetail(@Args('id') id: number) {
    const accommodation = await this.prismaService.accommodation.findUnique({
      where: { id: id },
    });

    return accommodation;
  }
}
