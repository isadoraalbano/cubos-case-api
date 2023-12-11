import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: '025635489555',
    description:
      'People document - *will be used to connect the people to the application through login*',
  })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    example: 'senha@123',
    description:
      'People password - *will be used to authenticate the user who wants to login*',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
