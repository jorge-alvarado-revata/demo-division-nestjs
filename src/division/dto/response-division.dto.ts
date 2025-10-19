import { Expose } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDivisionDto {
  @ApiProperty({
    description: 'Id division',
    example: '2',
  })
  @Expose()
  id: number;
  @ApiProperty({
    description: 'Nombre de division',
    example: 'Compras',
  })
  @Expose()
  nombre: string;
  @ApiProperty({
    description: 'Nivel de la division',
    example: '2',
  })
  @Expose()
  nivel: number;
  @ApiProperty({
    description: 'Numero de colaboradores',
    example: '2',
  })
  @Expose()
  colaboradores: number;
  @ApiProperty({
    description: 'Nombre embajador',
    example: 'Carlos Bravo',
  })
  @Expose()
  embajador: string;
  @ApiProperty({
    description: 'Padre de la division',
    example: '',
  })
  @Expose()
  parent: ResponseDivisionDto;
  @ApiProperty({
    description: 'divisiones hijas',
    example: '',
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseDivisionDto)
  divisiones: ResponseDivisionDto[];
}
