import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  contactEmail: string;

  @ApiProperty()
  contactPhone: string;
}

export class CreateJobDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  salary: string;

  @ApiProperty()
  company: CreateCompanyDto;
}
