import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Division {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, unique: true })
  nombre: string;

  @Column({ type: 'int' })
  nivel: number;

  @Column({ type: 'int' })
  colaboradores: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  embajador: string;

  @ManyToOne(() => Division, (division) => division.divisiones)
  parent: Division;

  @OneToMany(() => Division, (division) => division.parent)
  divisiones: Division[];
}
