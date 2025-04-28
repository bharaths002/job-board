import { IsNotEmpty, IsString, IsEnum, IsNumber, IsDate } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsEnum(['Full-time', 'Part-time', 'Contract', 'Internship'])
  jobType: string;

  @IsNotEmpty()
  @IsNumber()
  salaryMin: number;

  @IsNotEmpty()
  @IsNumber()
  salaryMax: number;

  @IsNotEmpty()
  @IsString()
  jobDescription: string;

  @IsNotEmpty()
  @IsString()
  requirements: string;

  @IsNotEmpty()
  @IsString()
  responsibilities: string;

  @IsNotEmpty()
  @IsDate()
  applicationDeadline: Date;
}