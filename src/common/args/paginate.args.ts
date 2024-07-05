import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(1)
  page: number = 1;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(1)
  per_page: number = 10;

  @Field({ nullable: true })
  sort: string;
}
