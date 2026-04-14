import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acessibilidade } from './entities/acessibilidade.entity';
import { AcessibilidadeService } from './service/acessibilidade.service';
import { AcessibilidadeController } from './controller/acessibilidade.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Acessibilidade])],
  providers: [AcessibilidadeService],
  controllers: [AcessibilidadeController],
  exports: [AcessibilidadeService],
})
export class AcessibilidadeModule {}
