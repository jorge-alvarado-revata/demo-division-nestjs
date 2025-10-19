import {
  IsInt,
  IsString,
  IsNotEmpty,
  MaxLength,
  Min,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDivisionDto {
  @ApiProperty({
    description: 'Nombre de division',
    example: 'Compras',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(45, { message: 'Nombre no debe exceder de 45 caracteres' })
  nombre: string;
  @ApiProperty({
    description: 'Numero de Nivel de la division',
    example: 25,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  nivel: number;
  @ApiProperty({
    description: 'Numero de colaboradores',
    example: 2,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  colaboradores: number;
  @ApiProperty({
    description: 'Nombre de embajador',
    example: 'Juan Perez',
    minimum: 18,
  })
  @IsString()
  embajador: string;
  @ApiProperty({
    description: 'Id optional del Padre',
    example: '101',
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  parentId: number;
}
