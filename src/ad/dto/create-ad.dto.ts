import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { AdCategory } from '../../entities/ad.entity'; 

export class CreateAdDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(AdCategory)
  category: AdCategory;

  @IsNumber()
  price: number;

  @IsString()
  contact: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: Date;
}
