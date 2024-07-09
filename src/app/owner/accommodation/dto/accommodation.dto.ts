import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { AccommodationStatus, AccommodationType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class OwnerCreateAccomodationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(AccommodationType)
  type: AccommodationType;

  @Field()
  @IsNotEmpty()
  @IsEnum(AccommodationStatus)
  status: AccommodationStatus;

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

  @Field()
  @IsNumber()
  @IsNotEmpty()
  owner_id: number;
}

@ArgsType()
export class OwnerAccommodationArgs {
  @Field({
    nullable: true,
    description: Object.values(AccommodationType).toString(),
  })
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

@ArgsType()
export class OwnerUpdateAccommodationInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(AccommodationType)
  type?: AccommodationType;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(AccommodationStatus)
  status?: AccommodationStatus;

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
