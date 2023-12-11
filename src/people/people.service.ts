import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PeopleRepository } from './repositories/people.repository';
import { CreatePeopleDto } from './dtos/create-people.dto';
import * as bcrypt from 'bcrypt';
import { PeopleResponseDto } from './dtos/people-response.dto';

@Injectable()
export class PeopleService {
  constructor(private readonly repository: PeopleRepository) {}

  async create(createPeopleDto: CreatePeopleDto): Promise<PeopleResponseDto> {
    const document = this.validCpfOrCnpj(createPeopleDto.document);
    if (!document) {
      throw new BadRequestException('Document is invalid.');
    }

    const people = {
      ...createPeopleDto,
      document,
      password: await bcrypt.hash(createPeopleDto.password, 10),
    };

    try {
      return await this.repository.create(people);
    } catch (error) {
      throw new ConflictException(
        'Document entered already exists in the database',
      );
    }
  }

  async validPeopleInformation(
    document: string,
    password: string,
  ): Promise<PeopleResponseDto> {
    const people = await this.repository.findByDocument(document);

    if (people) {
      const isValidPassword = await bcrypt.compare(password, people.password);
      if (isValidPassword) {
        return people;
      }
      throw new Error('Document or password provided is incorrect');
    }
  }

  private validCpfOrCnpj(document: string): string {
    const documentResult = document.replace(/[\s.-]*/g, '');
    if (documentResult.length >= 11 && documentResult.length <= 14) {
      return documentResult;
    }
    return undefined;
  }
}
