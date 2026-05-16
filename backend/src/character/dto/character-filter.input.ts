import { InputType, Field, Int } from '@nestjs/graphql';
import { Status, Gender } from '../character.model';

@InputType()
export class CharacterFilterInput {
  @Field(() => [Int], { nullable: true })
  ids?: number[];

  @Field(() => Status, { nullable: true })
  status?: Status;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  search?: string;
}

@InputType()
export class CharacterPaginationInput {
  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;
}

@InputType()
export class CreateCharacterInput {
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
}
