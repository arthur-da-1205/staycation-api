import { ArgsType, Field } from '@nestjs/graphql';
import { AccommodationStatus } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class UserAccommodationArgs {
  @Field({ nullable: true })
  @IsOptional()
  type?: string;

  @Field({
    nullable: true,
    description: Object.values(AccommodationStatus).toString(),
  })
  @IsOptional()
  status?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;
}
