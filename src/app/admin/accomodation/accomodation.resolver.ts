import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Accomodation } from './entities/accomodation.entity';
import { CreateAccomodationInput } from './dto/create-accomodation.input';
import { UpdateAccomodationInput } from './dto/update-accomodation.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAdminGuard } from '@common/gurads/gql.guard';
import { AccomodationService } from './service/accomodation.service';
import { AdminCreateAccomodationDto } from './dto/accomodation.dto';

@UseGuards(GqlAuthAdminGuard)
@Resolver()
export class AccomodationResolver {
  constructor(private readonly accomodationService: AccomodationService) {}

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

  @Query(() => String)
  findAll() {
    return 'Hello World';
  }
}
