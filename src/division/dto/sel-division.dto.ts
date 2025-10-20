import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SelDivisionDto {
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
}
