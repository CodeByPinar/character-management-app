import { PubSub } from 'graphql-subscriptions';
import { Resolver, Query, Args, Int, Mutation, Subscription } from '@nestjs/graphql';
import {
  Character,
  CharacterConnection,
  CharacterSort,
  CharacterStats,
} from './character.model';
import { CharacterService } from './character.service';
import {
  CharacterFilterInput,
  CharacterPaginationInput,
  CreateCharacterInput,
} from './dto/character-filter.input';

const pubSub = new PubSub<{
  characterAdded: { characterAdded: Character };
}>();

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private characterService: CharacterService) {}

  @Query(() => CharacterConnection, { name: 'characters' })
  findAll(
    @Args('filter', { type: () => CharacterFilterInput, nullable: true })
    filter?: CharacterFilterInput,
    @Args('pagination', { type: () => CharacterPaginationInput, nullable: true })
    pagination?: CharacterPaginationInput,
    @Args('sort', { type: () => CharacterSort, nullable: true })
    sort?: CharacterSort,
  ) {
    return this.characterService.findAll(filter, pagination, sort);
  }

  @Query(() => Character, { name: 'character', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.characterService.findOne(id);
  }

  @Query(() => [Int], { name: 'characterIds' })
  async findIds() {
    const rows = await this.characterService.findIds();
    return rows.map((row) => row.id);
  }

  @Query(() => CharacterStats, { name: 'characterStats' })
  stats(
    @Args('filter', { type: () => CharacterFilterInput, nullable: true })
    filter?: CharacterFilterInput,
  ) {
    return this.characterService.stats(filter);
  }

  @Mutation(() => Character, { name: 'createCharacter' })
  async createCharacter(
    @Args('input', { type: () => CreateCharacterInput }) input: CreateCharacterInput,
  ) {
    const character = await this.characterService.create(input);
    await pubSub.publish('characterAdded', { characterAdded: character as Character });
    return character;
  }

  @Subscription(() => Character, { name: 'characterAdded' })
  characterAdded() {
    return pubSub.asyncIterableIterator('characterAdded');
  }
}
