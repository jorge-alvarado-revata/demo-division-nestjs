import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EliminaHijosDto {
  @ApiProperty({
    description: 'Id de la Division',
    example: '1',
  })
  @IsNumber()
  id: number;
  @ApiProperty({
    description: 'Lista de hijos a retirar',
    example: '[1,2,3]',
  })
  @IsArray()
  lista: number[];
}
