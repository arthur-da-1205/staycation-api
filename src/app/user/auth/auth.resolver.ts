import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserLoginInput, UserRegisterInput } from './dto/user.dto';
import { UserAccessToken } from './entities/user-auth.entity';
import { UserAuthService } from './service/auth.service';

@Resolver('Auth')
export class UserAuthResolver {
  constructor(private readonly userAuth: UserAuthService) {}

  @Mutation(() => UserAccessToken)
  async userRegister(@Args('args') dto: UserRegisterInput) {
    const { user } = await this.userAuth.createUser(dto);

    const { access_token } = await this.userAuth.createToken(user);

    delete user.password;

    return { access_token, user };
  }

  @Mutation(() => UserAccessToken)
  async userLogin(@Args('args') dto: UserLoginInput) {
    const user = await this.userAuth.validate(dto.email, dto.password);

    const { access_token } = await this.userAuth.createToken(user);

    return { access_token, user };
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
