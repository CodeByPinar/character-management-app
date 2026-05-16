import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum Status {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
  UNKNOWN = 'UNKNOWN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}

export enum CharacterSort {
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
}

registerEnumType(Status, { name: 'Status' });
registerEnumType(Gender, { name: 'Gender' });
registerEnumType(CharacterSort, { name: 'CharacterSort' });

@ObjectType()
export class Character {
  @Field(() => Int)
  id: number;

  @Field()
  image: string;

  @Field()
  name: string;

  @Field(() => Status)
  status: Status;

  @Field(() => Gender)
  gender: Gender;

  @Field()
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage: boolean;

  @Field(() => Int, { nullable: true })
  nextSkip?: number | null;

  @Field({ nullable: true })
  endCursor?: string | null;
}

@ObjectType()
export class CharacterConnection {
  @Field(() => [Character])
  nodes: Character[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class CharacterStats {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  alive: number;

  @Field(() => Int)
  dead: number;

  @Field(() => Int)
  unknown: number;
}
