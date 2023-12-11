import { PrismaService } from 'src/prisma/prisma.service';
import { CardEntity } from '../entities/card.entity';
import { CreateCardDto } from '../dtos/card/create-card.dto';
import { CardResponseDto } from '../dtos/card/card-response.dto';
import { Injectable } from '@nestjs/common';
import { GetAllCardsResponseDto } from '../dtos/card/get-all-cards-response.dto';

@Injectable()
export class CardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCardDto: CreateCardDto,
    accountId: string,
    ownerId: string,
  ): Promise<CardResponseDto> {
    return await this.prisma.card.create({
      data: {
        accountId,
        ownerId,
        ...createCardDto,
      },
      select: {
        number: true,
        accountId: false,
        id: true,
        ownerId: false,
        cvv: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAllByAccountId(
    accountId: string,
    itemsPerPage: number,
    currentPage: number,
  ): Promise<GetAllCardsResponseDto> {
    const [cards, totalCount] = await this.prisma.$transaction([
      this.prisma.card.findMany({
        where: {
          accountId,
        },
        select: {
          number: true,
          accountId: false,
          id: true,
          ownerId: false,
          cvv: true,
          type: true,
          createdAt: true,
          updatedAt: true,
        },
        skip: currentPage * itemsPerPage - itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.card.count(),
    ]);

    const pageCount = Math.ceil(totalCount / itemsPerPage);
    return {
      cards,
      pagination: {
        itemsPerPage,
        pageCount,
        currentPage,
        totalCount,
      },
    };
  }

  async findAllByOwnerId(
    ownerId: string,
    itemsPerPage: number,
    currentPage: number,
  ): Promise<GetAllCardsResponseDto> {
    const [cards, totalCount] = await this.prisma.$transaction([
      this.prisma.card.findMany({
        where: {
          ownerId,
        },
        select: {
          number: true,
          accountId: false,
          id: true,
          ownerId: false,
          cvv: true,
          type: true,
          createdAt: true,
          updatedAt: true,
        },
        skip: currentPage * itemsPerPage - itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.card.count(),
    ]);

    const pageCount = Math.ceil(totalCount / itemsPerPage);
    return {
      cards,
      pagination: {
        itemsPerPage,
        pageCount,
        currentPage,
        totalCount,
      },
    };
  }

  async findPhysicalCard(accountId: string, type: string): Promise<CardEntity> {
    return this.prisma.card.findFirst({
      where: {
        accountId,
        type,
      },
    });
  }
}
