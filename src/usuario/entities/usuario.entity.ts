import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, nullable: false })
  nome!: string;

  @Column({ length: 255, nullable: false, unique: true })
  usuario!: string;

  @Column({ length: 255, nullable: false })
  senha!: string;

  //length: 5000
  @Column({ nullable: true })
  foto!: string;

  @OneToMany(() => Carona, (carona) => carona.usuario)
  caronas!: Carona[];
}
