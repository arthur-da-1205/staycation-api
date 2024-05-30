import { User } from '@models/user.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AdminAccessToken {
  @Field(() => String)
  access_token: number;

  @Field(() => User)
  user: User;
}
