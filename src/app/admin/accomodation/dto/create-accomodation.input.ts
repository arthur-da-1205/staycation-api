import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccomodationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
