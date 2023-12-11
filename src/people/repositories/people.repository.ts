import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePeopleDto } from '../dtos/create-people.dto';
import { PeopleResponseDto } from '../dtos/people-response.dto';

@Injectable()
export class PeopleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPeopleDto: CreatePeopleDto): Promise<PeopleResponseDto> {
    return this.prisma.people.create({
      data: createPeopleDto,
      select: {
        id: true,
        name: true,
        document: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByDocument(document: string): Promise<PeopleResponseDto> {
    return await this.prisma.people.findUnique({
      where: {
        document,
      },
      select: {
        id: true,
        name: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        document: true,
      },
    });
  }
}
