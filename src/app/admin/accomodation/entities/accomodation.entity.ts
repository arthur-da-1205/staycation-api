import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Accomodation {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  location: string;
}
