import { Field, ObjectType } from '@nestjs/graphql';
import { AccommodationStatus, AccommodationType } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { Paginated } from './paginate.model';

@ObjectType()
export class AccommodationModel {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  type: AccommodationType;

  @Field()
  status: AccommodationStatus;

  @Field()
  @IsOptional()
  description: string;

  @Field()
  location: string;

  @Field()
  price: number;
}

@ObjectType()
export class PaginateAccommodationModel extends Paginated(AccommodationModel) {}
