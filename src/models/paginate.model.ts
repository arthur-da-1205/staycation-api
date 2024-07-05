import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

interface IEdgeType<T> {
  cursor: string;
  node: T;
}

interface ICursorPageInfo {
  start_cursor: string;
  end_cursor: string;
  has_next_page: boolean;
  has_previous_page: boolean;
}

export interface ICursorPaginatedType<T> {
  edges: IEdgeType<T>[];
  total_count: number;
  page_info: ICursorPageInfo;
}

@ObjectType('CursorPageInfo')
abstract class CursorPageInfoType {
  @Field({ nullable: true })
  start_cursor: string;

  @Field({ nullable: true })
  end_cursor: string;

  @Field(() => Boolean, { nullable: true })
  has_next_page: boolean;

  @Field(() => Boolean, { nullable: true })
  has_previous_page: boolean;
}

export function CursorPaginated<T>(
  classRef: Type<T>,
): Type<ICursorPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class CursorPaginatedType implements ICursorPaginatedType<T> {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(() => Int)
    total_count: number;

    @Field(() => CursorPageInfoType, { nullable: true })
    page_info: CursorPageInfoType;
  }

  return CursorPaginatedType as Type<ICursorPaginatedType<T>>;
}

@ObjectType('PageInfo')
abstract class PageInfoType {
  @Field(() => Int, { nullable: true })
  total_count: number;

  @Field(() => Int, { nullable: true })
  page_count: number;

  @Field(() => Int, { nullable: true })
  page: number;

  @Field(() => Int, { nullable: true })
  per_page: number;
}

interface IPageInfo {
  total_count: number;
  page_count: number;
  page: number;
  per_page: number;
}

export interface IPaginatedType<T> {
  items: T[];
  meta: IPageInfo;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    items: T[];

    @Field(() => PageInfoType, { nullable: true })
    meta: PageInfoType;
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}
