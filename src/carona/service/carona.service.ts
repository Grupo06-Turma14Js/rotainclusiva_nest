import { AcessibilidadeService } from './../../acessibilidade/service/acessibilidade.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike, Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Carona } from '../entities/carona.entity';

@Injectable()
export class CaronaService {
  constructor(
    @InjectRepository(Carona)
    private caronaRepository: Repository<Carona>,
    private acessibilidadeService: AcessibilidadeService,
  ) {}

  async findAll(): Promise<Carona[]> {
    return await this.caronaRepository.find({
      relations: {
        acessibilidade: true,
        usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Carona> {
    const carona = await this.caronaRepository.findOne({
      where: {
        id,
      },
      relations: {
        acessibilidade: true,
        usuario: true,
      },
    });

    if (!carona)
      throw new HttpException('Carona não encontrada', HttpStatus.NOT_FOUND);
    return carona;
  }

  async findAllByOrigem(origem: string): Promise<Carona[]> {
    return await this.caronaRepository.find({
      where: {
        origem: ILike(`%${origem}%`),
      },
      relations: {
        acessibilidade: true,
      },
    });
  }

  private calcularTempoEstimado(distancia: number, velocidade: number): string {
    if (velocidade <= 0) return 'Velocidade inválida';

    const tempoDecimal = distancia / velocidade;
    const totalMinutos = Math.round(tempoDecimal * 60);

    if (totalMinutos < 60) {
      return `${totalMinutos} minutos`;
    } else {
      const horas = Math.floor(totalMinutos / 60);
      const minutos = totalMinutos % 60;
      return `${horas}h ${minutos}min`;
    }
  }

  // Adicione este método público no seu Service
  async calcularTempoPorId(id: number): Promise<string> {
    const carona = await this.findById(id);
    return this.calcularTempoEstimado(carona.distancia, carona.velocidade);
  }

  async create(carona: Carona): Promise<any> {
    if (carona.acessibilidade != null) {
      const acessibilidade = await this.acessibilidadeService.findById(
        carona.acessibilidade.id,
      );

      if (!acessibilidade)
        throw new HttpException(
          'Acessibilidade não encontrada!',
          HttpStatus.NOT_FOUND,
        );

      const caronaSalva = await this.caronaRepository.save(carona);
      return {
        ...caronaSalva,
        tempoEstimado: this.calcularTempoEstimado(
          caronaSalva.distancia,
          caronaSalva.velocidade,
        ),
      };
    } else {
      throw new HttpException(
        'Acessibilidade nao pode ser nulo!',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(carona: Carona): Promise<any> {
    const buscaCarona: Carona = await this.findById(carona.id);

    if (!buscaCarona || !carona.id)
      throw new HttpException('Carona não encontrada!', HttpStatus.NOT_FOUND);

    if (carona.acessibilidade) {
      const acessibilidade = await this.acessibilidadeService.findById(
        carona.acessibilidade.id,
      );

      if (!acessibilidade)
        throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

      const caronaAtualizada = await this.caronaRepository.save(carona);
      return {
        ...caronaAtualizada,
        tempoEstimado: this.calcularTempoEstimado(
          caronaAtualizada.distancia,
          caronaAtualizada.velocidade,
        ),
      };
    } else {
      throw new HttpException(
        'Acessibilidade nao pode ser nulo!',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.caronaRepository.delete(id);
  }
}
