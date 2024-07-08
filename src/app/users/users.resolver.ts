import { OwnerModel } from '@models/owner.model';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto, CreateUserInput } from './dto/user.dto';
import { UsersService } from './service/users.service';

@Resolver((of) => OwnerModel)
export class UserReslver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => OwnerModel)
  userSignUp(@Args('userSigninInput') userSignInInput: CreateUserDto) {
    return this.userService.createUser(userSignInInput);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
