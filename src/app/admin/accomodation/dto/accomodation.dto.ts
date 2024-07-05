import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { AccommodationStatus, AccomodationType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class AdminCreateAccomodationDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(AccomodationType)
  type: AccomodationType;

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
}

@ArgsType()
export class AdminAccommodationArgs {
  @Field({
    nullable: true,
    description: Object.values(AccomodationType).toString(),
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
export class UpdateAccommodationInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(AccomodationType)
  type?: AccomodationType;

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
