import { Acessibilidade } from './../entities/acessibilidade.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class AcessibilidadeService {
    constructor(
        @InjectRepository(Acessibilidade)
        private acessibilidadeRepository: Repository<Acessibilidade>
    ) { }

    async findAll(): Promise<Acessibilidade[]> {
        return await this.acessibilidadeRepository.find({            
          relations: {
                carona: true
            }
        });
    }

    async findById(id: number): Promise<Acessibilidade> {

        let acessibilidade = await this.acessibilidadeRepository.findOne({
            where: {
                id
            },          
            relations: {
                carona: true
            }
        });

        if (!acessibilidade)
            throw new HttpException('Acessibilidade não encontrada!', HttpStatus.NOT_FOUND);

        return acessibilidade;
    }

    async findAllByTipo(tipo: string): Promise<Acessibilidade[]> {
        return await this.acessibilidadeRepository.find({
            where: {
                tipo: ILike(`%${tipo}%`)
            },            
            relations: {
                carona: true
            }
        })
    }

    async create(acessibilidade: Acessibilidade): Promise<Acessibilidade> {
        return await this.acessibilidadeRepository.save(acessibilidade);
    }

    async update(acessibilidade: Acessibilidade): Promise<Acessibilidade> {

        await this.findById(acessibilidade.id);

        return await this.acessibilidadeRepository.save(acessibilidade);
    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return await this.acessibilidadeRepository.delete(id);

    }

}