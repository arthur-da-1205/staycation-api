import { GqlAuthGuard } from '@common/gurads/gql.guard';
import { ME } from '@decorators/get-me.decorator';
import { UserModel } from '@models/user.model';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';

@Resolver('Personal')
@UseGuards(GqlAuthGuard)
export class UserPersonalResolver {
  @Query(() => UserModel)
  async userPersonalProfile(@ME() me: User): Promise<User> {
    return me;
  }
}
