import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UserFavouriteInput {
  @Field()
  @IsNotEmpty()
  property_id: number;
}
