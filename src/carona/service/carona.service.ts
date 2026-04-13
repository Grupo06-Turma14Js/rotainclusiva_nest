import { AcessibilidadeService } from './../../acessibilidade/service/acessibilidade.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ILike, Repository} from "typeorm";
import { DeleteResult } from "typeorm/browser";
import { InjectRepository } from "@nestjs/typeorm";
import { Carona } from "../entities/carona.entity";
 
 
 
@Injectable() 
export class CaronaService {
     constructor(
        @InjectRepository(Carona) 
        private caronaRepository: Repository<Carona>,
        private acessibilidadeService: AcessibilidadeService
    ){}
   
 
    async findAll(): Promise<Carona[]>{ 
       return await this.caronaRepository.find({
            relations: {
                acessibilidade:  true
            }
       }); 
       
    }  
 
    async findById(id: number): Promise<Carona> {
 
        const carona = await this.caronaRepository.findOne({
            where: {
            id
            }, 
            relations: {
                acessibilidade:  true
            }
        });
 
        if (!carona)
            throw new HttpException('Carona não encontrada', HttpStatus.NOT_FOUND);
        return carona;
    }
 
    async findAllByOrigem(origem: string): Promise <Carona[]> {
        return await this.caronaRepository.find({
            where: {
                origem: ILike(`%${origem}%`)
            },
            relations: {
                acessibilidade: true
            }
        })
    }
 
    async create(carona: Carona): Promise<Carona> {
       
        if (carona.acessibilidade != null) {
           
            let acessibilidade = await this.acessibilidadeService.findById(carona.acessibilidade.id)
 
            if (!acessibilidade)
                throw new HttpException('Acessibilidade não encontrada!', HttpStatus.NOT_FOUND);
 
              return await this.caronaRepository.save(carona);
        }else{
            throw new HttpException('Acessibilidade nao pode ser nulo!', HttpStatus.NOT_FOUND);
        }
   
    }
 
    async update(carona: Carona): Promise<Carona> {
       
        let buscaCarona: Carona = await this.findById(carona.id);
 
        if (!buscaCarona || !carona.id)
            throw new HttpException('Carona não encontrada!', HttpStatus.NOT_FOUND);
 
        if (carona.acessibilidade){
           
            let acessibilidade = await this.acessibilidadeService.findById(carona.acessibilidade.id)
               
            if (!acessibilidade)
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
               
            return await this.caronaRepository.save(carona);
   
        }else{
            throw new HttpException('Acessibilidade nao pode ser nulo!', HttpStatus.NOT_FOUND);
        }
       
    }
 
    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
       
        return await this.caronaRepository.delete(id)
    }
}