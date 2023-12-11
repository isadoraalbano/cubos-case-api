import { Body, Controller, Post } from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePeopleDto } from './dtos/create-people.dto';
import { PeopleResponseDto } from './dtos/people-response.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { isPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @ApiConflictResponse({ description: 'Document invalid' })
  @ApiCreatedResponse({ description: 'People created successfully' })
  @ApiCreatedResponse({
    type: PeopleResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid iformations',
  })
  @ApiBody({ type: CreatePeopleDto })
  @ApiOperation({
    description: 'Endpoint to create People',
  })
  @isPublic()
  @Post()
  async create(
    @Body() createUserDto: CreatePeopleDto,
  ): Promise<PeopleResponseDto> {
    return this.peopleService.create(createUserDto);
  }
}
