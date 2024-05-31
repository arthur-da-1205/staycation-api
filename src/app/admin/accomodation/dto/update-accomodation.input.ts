import { CreateAccomodationInput } from './create-accomodation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccomodationInput extends PartialType(CreateAccomodationInput) {
  @Field(() => Int)
  id: number;
}
