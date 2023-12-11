import { ConflictException, Injectable } from '@nestjs/common';
import { CardResponseDto } from '../dtos/card/card-response.dto';
import { CreateCardDto } from '../dtos/card/create-card.dto';
import { CardRepository } from '../repositories/card.repository';
import { GetAllCardsResponseDto } from '../dtos/card/get-all-cards-response.dto';

@Injectable()
export class CardService {
  constructor(private repository: CardRepository) {}
  async create(
    createCardDto: CreateCardDto,
    accountId: string,
    ownerId: string,
  ): Promise<CardResponseDto> {
    if (createCardDto.type === 'physical') {
      const physicalCard = await this.repository.findPhysicalCard(
        accountId,
        createCardDto.type,
      );
      if (physicalCard) {
        throw new ConflictException(
          'It is not possible to create more than one physical card',
        );
      }
    }
    const formatNumber = this.formatNumber(createCardDto.number);
    const cardCreated = await this.repository.create(
      createCardDto,
      accountId,
      ownerId,
    );
    return {
      ...cardCreated,
      number: formatNumber,
    };
  }

  async findAllByOwnerId(
    itemsPerPage: number,
    currentPage: number,
    ownerId: string,
  ): Promise<GetAllCardsResponseDto> {
    return await this.repository.findAllByOwnerId(
      ownerId,
      itemsPerPage,
      currentPage,
    );
  }

  async findAllByAccount(
    accoundId: string,
    itemsPerPage: number,
    currentPage: number,
  ): Promise<GetAllCardsResponseDto> {
    const { cards, pagination } = await this.repository.findAllByAccountId(
      accoundId,
      itemsPerPage,
      currentPage,
    );
    const formatedCards = this.formatCardsNumber(cards);
    return {
      cards: formatedCards,
      pagination,
    };
  }

  private formatCardsNumber(cards: CardResponseDto[]): CardResponseDto[] {
    const formatedCards = cards.map(element => {
      element.number = this.formatNumber(element.number);
      return element;
    });

    return formatedCards;
  }

  private formatNumber(cardNumber: string): string {
    const formatedNumber = cardNumber.substring(
      cardNumber.length - 4,
      cardNumber.length,
    );

    return formatedNumber;
  }
}
