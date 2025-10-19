import { Expose } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ResponseDivisionDto {
  @Expose()
  id: number;
  @Expose()
  nombre: string;
  @Expose()
  nivel: number;
  @Expose()
  colaboradores: number;
  @Expose()
  embajador: string;
  @Expose()
  parent: ResponseDivisionDto;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseDivisionDto)
  divisiones: ResponseDivisionDto[];
}
