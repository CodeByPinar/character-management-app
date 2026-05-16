import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CharacterFilterInput,
  CharacterPaginationInput,
  CreateCharacterInput,
} from './dto/character-filter.input';
import { CharacterSort, Status } from './character.model';

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  private buildWhere(filter?: CharacterFilterInput): Prisma.CharacterWhereInput {
    const where: Prisma.CharacterWhereInput = {};

    if (filter?.ids?.length) {
      where.id = { in: filter.ids };
    }

    if (filter?.status) {
      where.status = filter.status;
    }

    if (filter?.gender) {
      where.gender = filter.gender;
    }

    if (filter?.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { description: { contains: filter.search } },
      ];
    }

    return where;
  }

  private getOrderBy(sort: CharacterSort = CharacterSort.CREATED_AT_DESC): Prisma.CharacterOrderByWithRelationInput[] {
    switch (sort) {
      case CharacterSort.NAME_ASC:
        return [{ name: 'asc' }, { id: 'asc' }];
      case CharacterSort.NAME_DESC:
        return [{ name: 'desc' }, { id: 'desc' }];
      case CharacterSort.CREATED_AT_ASC:
        return [{ createdAt: 'asc' }, { id: 'asc' }];
      case CharacterSort.CREATED_AT_DESC:
      default:
        return [{ createdAt: 'desc' }, { id: 'desc' }];
    }
  }

  async findAll(
    filter?: CharacterFilterInput,
    pagination?: CharacterPaginationInput,
    sort?: CharacterSort,
  ) {
    const where = this.buildWhere(filter);
    const take = Math.min(Math.max(pagination?.take ?? 12, 1), 50);
    const skip = Math.max(pagination?.skip ?? 0, 0);

    const [nodes, totalCount] = await Promise.all([
      this.prisma.character.findMany({
        where,
        take,
        skip,
        orderBy: this.getOrderBy(sort),
      }),
      this.prisma.character.count({ where }),
    ]);

    const nextSkip = skip + nodes.length;
    const hasNextPage = nextSkip < totalCount;

    return {
      nodes,
      totalCount,
      pageInfo: {
        hasNextPage,
        nextSkip: hasNextPage ? nextSkip : null,
        endCursor: nodes.length ? String(nodes[nodes.length - 1].id) : null,
      },
    };
  }

  async stats(filter?: CharacterFilterInput) {
    const baseWhere = this.buildWhere(filter);
    const withoutStatus = { ...baseWhere };
    delete withoutStatus.status;

    const [total, alive, dead, unknown] = await Promise.all([
      this.prisma.character.count({ where: withoutStatus }),
      this.prisma.character.count({ where: { ...withoutStatus, status: Status.ALIVE } }),
      this.prisma.character.count({ where: { ...withoutStatus, status: Status.DEAD } }),
      this.prisma.character.count({ where: { ...withoutStatus, status: Status.UNKNOWN } }),
    ]);

    return { total, alive, dead, unknown };
  }

  async findIds() {
    return this.prisma.character.findMany({
      select: { id: true },
      orderBy: { id: 'asc' },
    });
  }

  async create(input: CreateCharacterInput) {
    return this.prisma.character.create({
      data: input,
    });
  }

  async findOne(id: number) {
    return this.prisma.character.findUnique({
      where: { id },
    });
  }
}
