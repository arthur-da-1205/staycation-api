import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { PropertyStatus, PropertyType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class OwnerCreatePropertyInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(PropertyType)
  type: PropertyType;

  @Field()
  @IsNotEmpty()
  @IsEnum(PropertyStatus)
  status: PropertyStatus;

  @Field()
  @IsString()
  @IsNotEmpty()
  location: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Field({ nullable: true })
  @IsNumber()
  owner_id: number;
}

@ArgsType()
export class OwnerPropertyArgs {
  @Field({
    nullable: true,
    description: Object.values(PropertyType).toString(),
  })
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

@ArgsType()
export class OwnerUpdatePropertyInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(PropertyType)
  type?: PropertyType;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;
}
