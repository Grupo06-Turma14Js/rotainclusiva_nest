import { Acessibilidade } from './../../acessibilidade/entities/acessibilidade.entity';
import { IsNotEmpty } from 'class-validator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import { Usuario } from '../../usuario/entities/usuario.entity';


@Entity({ name: 'tb_carona' }) 
export class Carona {

  @PrimaryGeneratedColumn() 
  id!: number;

  @IsNotEmpty()
  @Column()
  origem!: string;

  @IsNotEmpty()
  @Column()
  destino!: string;

  @UpdateDateColumn() 
  data!: Date;


  
  @ManyToOne(() => Acessibilidade, (acessibilidade) => acessibilidade.carona,{
    onDelete: "CASCADE"
  })
  acessibilidade!: Acessibilidade;

   
  @ManyToOne(() => Usuario, (usuario) => usuario.caronas, {
    onDelete: "CASCADE"
  })
  usuario!: Usuario;
 
  
}
