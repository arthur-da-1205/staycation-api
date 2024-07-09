import { UserModel } from '@models/user.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserAccessToken {
  @Field(() => String)
  access_token: number;

  @Field(() => UserModel)
  user: UserModel;
}
