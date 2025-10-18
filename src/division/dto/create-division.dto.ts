import { IsNumber, IsString, IsNotEmpty, MaxLength } from 'class-validator';

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
}
