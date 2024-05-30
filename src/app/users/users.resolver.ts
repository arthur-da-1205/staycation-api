import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './service/users.service';
import { CreateUserDto, CreateUserInput } from './dto/user.dto';
import { User } from '@models/user.model';

@Resolver((of) => User)
export class UserReslver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  userSignUp(@Args('userSigninInput') userSignInInput: CreateUserDto) {
    return this.userService.createUser(userSignInInput);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
