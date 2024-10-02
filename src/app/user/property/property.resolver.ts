import { PaginationArgs } from '@common/args/paginate.args';
import { GenericException } from '@common/exceptions/generic.exception';
import { GqlAuthGuard } from '@common/gurads/gql.guard';
import { PaginatePropertyModel, PropertyModel } from '@models/property.model';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@prisma/prisma.service';
import { UserPropertyArgs } from './dto/property.dto';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserPropertyResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => PaginatePropertyModel)
  async userPropertyList(
    @Args() paginate: PaginationArgs,
    @Args({ nullable: true }) filter: UserPropertyArgs,
  ): Promise<PaginatePropertyModel> {
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
      this.prismaService.property.findMany({
        where: where as any,
        take: paginate.per_page,
        skip: (paginate.page - 1) * paginate.per_page,
        orderBy: { updatedAt: 'desc' },
      }),
      this.prismaService.property.count({ where: where as any }),
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

  @Query(() => PropertyModel)
  async userPropertyDetail(@Args('id') id: number) {
    const property = await this.prismaService.property.findUnique({
      where: { id: id },
    });

    return property;
  }
}
