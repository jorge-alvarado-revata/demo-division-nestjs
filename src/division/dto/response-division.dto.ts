import { Exclude, Expose } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ResponseDivisionDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Expose()
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Expose()
  nombre: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Expose()
  nivel: number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Expose()
  colaboradores: number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Expose()
  embajador: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Expose()
  parent: ResponseDivisionDto;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsArray()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @ValidateNested({ each: true })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Type(() => ResponseDivisionDto)
  divisiones: ResponseDivisionDto[];
}
