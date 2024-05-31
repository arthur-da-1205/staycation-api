import { Field, InputType } from '@nestjs/graphql';
import { AccomodationType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
