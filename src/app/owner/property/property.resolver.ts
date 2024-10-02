import { PaginationArgs } from '@common/args/paginate.args';
import { ME } from '@common/decorators/get-me.decorator';
import { GenericException } from '@common/exceptions/generic.exception';
import { GqlAuthOwnerGuard } from '@common/gurads/gql.guard';
import { PaginatePropertyModel, PropertyModel } from '@models/property.model';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Owner } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import {
  OwnerCreatePropertyInput,
  OwnerPropertyArgs,
  OwnerUpdatePropertyInput,
} from './dto/property.dto';
import { Property } from './entities/property.entity';
import { OwnerPropertyService } from './service/property.service';

@Resolver()
@UseGuards(GqlAuthOwnerGuard)
export class OwnerPropertynResolver {
  constructor(
    private readonly propertyService: OwnerPropertyService,
    private prismaService: PrismaService,
  ) {}

  @Mutation(() => Property)
  async ownerCreateProperty(
    @Args('args')
    createPropertyInput: OwnerCreatePropertyInput,
    @ME() me: Owner,
  ) {
    const property = await this.propertyService.create({
      ...createPropertyInput,
      owner_id: me.id,
    });

    return property;
  }

  @Query(() => PaginatePropertyModel)
  async ownerPropertyList(
    @Args() paginate: PaginationArgs,
    @Args({ nullable: true }) filter: OwnerPropertyArgs,
    @ME() me: Owner,
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
      owner_id: me.id,
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
  async ownerPropertyDetail(@Args('id') id: number) {
    const property = await this.prismaService.property.findUnique({
      where: { id: id },
    });

    return property;
  }

  @Mutation(() => PropertyModel)
  async ownerUpdateProperty(
    @Args('id') id: number,
    @Args({ nullable: true }) data: OwnerUpdatePropertyInput,
  ): Promise<PropertyModel> {
    const property = await this.prismaService.property.findUnique({
      where: { id: id },
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    const result = this.prismaService.property.update({
      where: { id },
      data,
    });

    return result;
  }
}
