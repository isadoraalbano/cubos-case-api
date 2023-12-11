import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePeopleDto {
  @ApiProperty({ description: 'People name', example: 'Isadora Albano' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'People document | Must be CPF or CNPJ',
    example: '049.456.384-66',
  })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    description: 'Password of account people | Must contain at least 8 digits',
    example: 'Senha@123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
