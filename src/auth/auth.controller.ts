import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { isPublic } from './decorators/is-public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PeopleResponseDto } from 'src/people/dtos/people-response.dto';

@ApiTags('Auth')
@Controller('login')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiCreatedResponse({ description: ' Login successful' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiOperation({
    description: 'Endpoint to login User and generate access token',
  })
  @ApiBody({
    type: LoginDto,
  })
  @isPublic()
  @Post()
  @UseGuards(LocalAuthGuard)
  login(@CurrentUser() user: PeopleResponseDto, @Body() loginDto: LoginDto) {
    return this.service.login(user);
  }
}
