import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsInt, Min } from 'class-validator';
@Entity()
@Check(`"nivel" >= 0`)
@Check(`"colaboradores" >= 0`)
export class Division {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, unique: true })
  nombre: string;

  @Column({ type: 'int' })
  @IsInt()
  @Min(0)
  nivel: number;

  @Column({ type: 'int' })
  @IsInt()
  @Min(0)
  colaboradores: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  embajador: string;

  @ManyToOne(() => Division, (division) => division.divisiones)
  parent: Division;

  @OneToMany(() => Division, (division) => division.parent, {
    onDelete: 'SET NULL',
  })
  divisiones: Division[];
}
