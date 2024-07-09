import { OwnerModel } from '@models/owner.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OwnerAccessToken {
  @Field(() => String)
  access_token: number;

  @Field(() => OwnerModel)
  user: OwnerModel;
}
