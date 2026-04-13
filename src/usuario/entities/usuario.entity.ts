import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Carona } from '../../carona/entities/carona.entity';

@Entity({ name: 'tb_usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, nullable: false })
  nome!: string;

  @Column({ length: 255, nullable: false, unique: true })
  usuario!: string; // Esse campo é o email

  @Column({ length: 255, nullable: false })
  senha!: string;

  @Column({ length: 5000, nullable: true })
  foto!: string;

  @OneToMany(() => Carona, (carona) => carona.usuario)
  caronas!: Carona[];
}
