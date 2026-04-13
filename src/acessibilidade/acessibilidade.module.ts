import { Module } from '@nestjs/common';
import { AcessibilidadeController } from './acessibilidade.controller';
import { AcessibilidadeService } from './acessibilidade.service';

@Module({
  controllers: [AcessibilidadeController],
  providers: [AcessibilidadeService],
})
export class AcessibilidadeModule {}