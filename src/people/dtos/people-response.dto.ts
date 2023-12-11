import { ApiProperty } from '@nestjs/swagger';

export class PeopleResponseDto {
  @ApiProperty({ description: 'People id' })
  id: string;

  @ApiProperty({ description: 'People name' })
  name: string;

  @ApiProperty({ description: 'People document' })
  document: string;

  @ApiProperty({ description: 'People id', required: false })
  password?: string;

  @ApiProperty({ description: 'People record creation date and time' })
  createdAt: Date;

  @ApiProperty({ description: 'Date and time of updating the people record' })
  updatedAt: Date;
}
