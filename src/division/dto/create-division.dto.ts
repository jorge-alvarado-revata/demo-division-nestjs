import {
  IsNumber,
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmpty,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDivisionDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MaxLength(45, { message: 'Nombre no debe exceder de 45 caracteres' })
  nombre: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  nivel: number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  colaboradores: number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  embajador: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Type(() => CreateDivisionDto)
  parent: CreateDivisionDto;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsArray()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @ValidateNested({ each: true })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Type(() => CreateDivisionDto)
  divisiones: CreateDivisionDto[];
}
