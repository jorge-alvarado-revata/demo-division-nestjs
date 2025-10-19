import { IsInt, IsString, IsNotEmpty, MaxLength, Min } from 'class-validator';

export class CreateDivisionDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MaxLength(45, { message: 'Nombre no debe exceder de 45 caracteres' })
  nombre: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsInt()
  @Min(0)
  nivel: number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsInt()
  @Min(0)
  colaboradores: number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  embajador: string;
}
