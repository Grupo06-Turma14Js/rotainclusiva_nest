import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Carona } from './entities/carona.entity';
import { AcessibilidadeModule } from '../acessibilidade/acessibilidade.module';
import { CaronaService } from './service/carona.service';
import { CaronaController } from './controller/carona.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Carona, Usuario]), AcessibilidadeModule],
  providers: [CaronaService],
  controllers: [CaronaController],
  exports: [TypeOrmModule],
})
export class CaronaModule {}
