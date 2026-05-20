import { IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Carona } from '../../carona/entities/carona.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_acessibilidades' })
export class Acessibilidade {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @IsNotEmpty()
  @MinLength(2)
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  tipo!: string;

  @ApiProperty({ type: () => [Carona] })
  @OneToMany(() => Carona, (carona) => carona.acessibilidade)
  carona!: Carona[];
}
