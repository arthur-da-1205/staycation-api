import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FavouriteModel {
  @Field()
  id: number
}
