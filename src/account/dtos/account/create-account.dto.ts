import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    description: 'Account branch',
    example: '001',
  })
  @IsString()
  @IsNotEmpty()
  branch: string;

  @ApiProperty({
    description: 'Account number',
    example: '24421431',
  })
  @IsString()
  @IsNotEmpty()
  account: string;
}
