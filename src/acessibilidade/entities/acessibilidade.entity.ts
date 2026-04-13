import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_acessibilidade' })
export class Acessibilidade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, nullable: false })
  tipo!: string;
} // fazer relacao com a entidade carona 
