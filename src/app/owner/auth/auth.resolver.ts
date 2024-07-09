import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OwnerLoginInput, OwnerRegisterInput } from './dto/owner.dto';
import { OwnerAccessToken } from './entities/owner-auth.entity';
import { OwnerAuthService } from './service/auth.service';

@Resolver()
export class OwnerAuthResolver {
  constructor(private readonly ownerAuth: OwnerAuthService) {}

  @Mutation(() => OwnerAccessToken)
  async ownerRegister(@Args('args') dto: OwnerRegisterInput) {
    const { user } = await this.ownerAuth.createOwner(dto);

    const { access_token } = await this.ownerAuth.createToken(user);

    delete user.password;

    return { access_token, user };
  }

  @Mutation(() => OwnerAccessToken)
  async ownerLogin(@Args('args') dto: OwnerLoginInput) {
    const user = await this.ownerAuth.validate(dto.email, dto.password);
    const { access_token } = await this.ownerAuth.createToken(user);

    return { access_token, user };
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
