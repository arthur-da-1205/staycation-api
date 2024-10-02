import { ArgsType, Field } from '@nestjs/graphql';
import { PropertyStatus } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class UserPropertyArgs {
  @Field({ nullable: true })
  @IsOptional()
  type?: string;

  @Field({
    nullable: true,
    description: Object.values(PropertyStatus).toString(),
  })
  @IsOptional()
  status?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;
}
