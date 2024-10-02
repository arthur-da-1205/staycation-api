import { GqlAuthGuard } from '@common/gurads/gql.guard';
import { ME } from '@decorators/get-me.decorator';
import { FavouriteModel } from '@models/favourite.model';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { UserFavouriteInput } from './dto/favourite.dto';

@Resolver('Favourite')
@UseGuards(GqlAuthGuard)
export class UserFavouriteResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => FavouriteModel)
  async userFavouriteList(@ME() me: User) {
    return await this.prisma.favourite.findUnique({ where: { id: me.id } });
  }

  @Mutation(() => FavouriteModel)
  async userFavouriteAdd(
    @Args('args') createFavouriteInput: UserFavouriteInput,
    @ME() me: User,
  ) {
    const property = await this.prisma.property.findFirst({
      where: {
        id: createFavouriteInput.property_id,
        status: 'ACTIVE',
      },
    });

    const fav = await this.prisma.favourite.upsert({
      where: {
        user_id_property_id: {
          user_id: me.id,
          property_id: property.id,
        },
      },
      update: {},
      create: {
        user_id: me.id,
        property_id: property.id,
        // Add other fields to be created if necessary
      },
    });

    return fav;
  }

  @Mutation(() => Boolean)
  async userFavouriteDelete(
    @Args('args') deleteFavouriteInput: UserFavouriteInput,
    @ME() me: User,
  ) {
    await this.prisma.favourite.delete({
      where: {
        user_id_property_id: {
          user_id: me.id,
          property_id: deleteFavouriteInput.property_id,
        },
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  async userFavouriteCheck(
    @Args('accomodation_id') property_id: number,
    @ME() me: User,
  ) {
    const fav = await this.prisma.favourite.findUnique({
      where: {
        user_id_property_id: {
          user_id: me.id,
          property_id: property_id,
        },
      },
    });

    if (!fav) return false;

    return true;
  }
}
