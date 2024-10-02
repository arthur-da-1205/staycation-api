import { Field, ObjectType } from '@nestjs/graphql';
import { PropertyStatus, PropertyType } from '@prisma/client';
import { Paginated } from './paginate.model';

@ObjectType()
export class PropertyModel {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  type: PropertyType;

  @Field()
  status: PropertyStatus;

  @Field({ nullable: true })
  // @IsOptional()
  description: string;

  @Field()
  location: string;

  @Field()
  price: number;

  @Field()
  owner_id: number;
}

@ObjectType()
export class PaginatePropertyModel extends Paginated(PropertyModel) {}
