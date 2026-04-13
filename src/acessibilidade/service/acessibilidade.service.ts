import { Injectable } from '@nestjs/common';
import { CreateAcessibilidadeDto } from '../dto/create-acessibilidade.dto';
import { UpdateAcessibilidadeDto } from '../dto/update-acessibilidade.dto';
import { Acessibilidade } from '../entities/acessibilidade.entity';

@Injectable()
export class AcessibilidadeService {
  create(createDto: CreateAcessibilidadeDto) {
    return createDto;
  }

  findAll() {
    return `Retorna todas as acessibilidades`;
  }

  findOne(id: number) {
    return `Retorna a acessibilidade ${id}`;
  }

  update(id: number, updateDto: UpdateAcessibilidadeDto) {
    return { id, ...updateDto };
  }

  remove(id: number) {
    return `Remove a acessibilidade ${id}`;
  }
}