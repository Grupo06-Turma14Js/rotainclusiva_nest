import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Carona } from "../../carona/entities/carona.entity";

@Entity({name: "tb_acessibilidades"})
export class Acessibilidade {

    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    tipo!: string;

    
    @OneToMany(() => Carona, (carona) => carona.acessibilidade)
    carona!: Carona[] 

    
}
