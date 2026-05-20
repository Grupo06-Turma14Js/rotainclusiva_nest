import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Carona } from '../../carona/entities/carona.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome!: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({ length: 255, nullable: false, unique: true })
  @ApiProperty()
  usuario!: string;

  @IsNotEmpty()
  @MinLength(6)
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  senha!: string;

  @Column({ length: 5000, nullable: true })
  @ApiProperty()
  foto!: string;

  @ApiProperty({ type: () => Carona })
  @OneToMany(() => Carona, (carona) => carona.usuario)
  caronas!: Carona[];
}
