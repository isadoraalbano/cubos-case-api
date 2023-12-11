import { ApiProperty } from '@nestjs/swagger';

export class AccountResponseDto {
  @ApiProperty({ description: 'Account UUID' })
  id: string;

  @ApiProperty({ description: 'Account branch' })
  branch: string;

  @ApiProperty({ description: 'Account number' })
  account: string;

  @ApiProperty({ description: 'Account creation datetime' })
  createdAt: Date;

  @ApiProperty({ description: 'Datetime of account update' })
  updatedAt: Date;
}
