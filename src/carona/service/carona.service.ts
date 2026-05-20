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
        usuario: true,
      },
    });
  }

  private calcularTempoEstimado(distancia: number, velocidade: number): string {
    const dist = Number(distancia);
    const vel = Number(velocidade);

    if (vel <= 0) return 'Velocidade inválida';

    const totalMinutos = Math.round((dist / vel) * 60);

    if (totalMinutos < 60) return `${totalMinutos} minutos`;

    const horas = Math.floor(totalMinutos / 60);
    const minutos = totalMinutos % 60;
    return minutos > 0 ? `${horas}h ${minutos}min` : `${horas}h`;
  }

  async calcularTempoPorId(id: number): Promise<string> {
    const carona = await this.findById(id);
    return this.calcularTempoEstimado(carona.distancia, carona.velocidade);
  }

  async create(carona: Carona): Promise<any> {
    if (!carona.acessibilidade?.id)
      throw new HttpException(
        'Acessibilidade não pode ser nula!',
        HttpStatus.BAD_REQUEST,
      );

    await this.acessibilidadeService.findById(carona.acessibilidade.id);

    const caronaSalva = await this.caronaRepository.save(carona);
    return {
      ...caronaSalva,
      tempoEstimado: this.calcularTempoEstimado(
        caronaSalva.distancia,
        caronaSalva.velocidade,
      ),
    };
  }

  async update(carona: Carona): Promise<any> {
    if (!carona.id)
      throw new HttpException('Carona não encontrada!', HttpStatus.NOT_FOUND);

    await this.findById(carona.id);

    if (!carona.acessibilidade?.id)
      throw new HttpException(
        'Acessibilidade não pode ser nula!',
        HttpStatus.BAD_REQUEST,
      );

    await this.acessibilidadeService.findById(carona.acessibilidade.id);

    const caronaAtualizada = await this.caronaRepository.save(carona);
    return {
      ...caronaAtualizada,
      tempoEstimado: this.calcularTempoEstimado(
        caronaAtualizada.distancia,
        caronaAtualizada.velocidade,
      ),
    };
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.caronaRepository.delete(id);
  }
}
