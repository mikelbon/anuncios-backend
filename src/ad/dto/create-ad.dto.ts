import {
  IsString,
  IsNumber,
  IsIn,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateAdDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsIn(['departamento', 'cochera', 'servicio', 'articulo'])
  category: string;

  @IsNumber()
  price: number;

  @IsString()
  contact: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
