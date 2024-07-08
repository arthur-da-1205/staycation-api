import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OwnerModel {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;
}
