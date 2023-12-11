import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PeopleRepository } from './repositories/people.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleRepository],
  exports: [PeopleService],
})
export class PeopleModule {}
