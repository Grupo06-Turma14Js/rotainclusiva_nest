import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({ name: "tb_usuario" })
export class Usuario {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column({ length: 255, nullable: false })
    nome!: string;

    @Column({ length: 255, nullable: false, unique: true }) 
    usuario!: string; 

    @Column({ length: 255, nullable: false })
    senha!: string;

    @Column({ nullable: true })
    foto!: string;

}