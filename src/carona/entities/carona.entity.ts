import { Acessibilidade } from './../../acessibilidade/entities/acessibilidade.entity';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_carona' })
export class Carona {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  @ApiProperty()
  origem!: string;

  @IsNotEmpty()
  @Column()
  @ApiProperty()
  destino!: string;

  @IsNumber()
  @Min(0.1)
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @ApiProperty()
  distancia!: number;

  @IsNumber()
  @Min(1)
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @ApiProperty()
  velocidade!: number;

  @UpdateDateColumn()
  @ApiProperty()
  data!: Date;

  @ApiProperty({ type: () => Acessibilidade })
  @ManyToOne(() => Acessibilidade, (acessibilidade) => acessibilidade.carona, {
    onDelete: 'CASCADE',
  })
  acessibilidade!: Acessibilidade;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.caronas, {
    onDelete: 'CASCADE',
  })
  usuario!: Usuario;
}
