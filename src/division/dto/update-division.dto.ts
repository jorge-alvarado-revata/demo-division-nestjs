import { IsInt, IsString, MaxLength, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDivisionDto {
  @ApiProperty({
    description: 'Nombre de division',
    example: 'Compras',
  })
  @IsOptional()
  @IsString()
  @MaxLength(45, { message: 'Nombre no debe exceder de 45 caracteres' })
  nombre?: string;
  @ApiProperty({
    description: 'Numero de Nivel de la division',
    example: 25,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  nivel?: number;
  @ApiProperty({
    description: 'Numero de colaboradores',
    example: 2,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  colaboradores?: number;
  @ApiProperty({
    description: 'Nombre de embajador',
    example: 'Juan Perez',
    minimum: 18,
  })
  @IsOptional()
  @IsString()
  embajador?: string;
}
