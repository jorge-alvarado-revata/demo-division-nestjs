import {
  IsInt,
  IsString,
  IsNotEmpty,
  MaxLength,
  Min,
  IsNumber,
} from 'class-validator';

export class UpdateDivisionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsString()
  @MaxLength(45, { message: 'Nombre no debe exceder de 45 caracteres' })
  nombre: string;
  @IsInt()
  @Min(0)
  nivel: number;
  @IsInt()
  @Min(0)
  colaboradores: number;
  @IsString()
  embajador: string;
}
