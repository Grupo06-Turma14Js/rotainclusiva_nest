import { Module } from '@nestjs/common';
import { AcessibilidadeController } from './controllers/acessibilidade.controller';
import { AcessibilidadeService } from './service/acessibilidade.service';

@Module({
  controllers: [AcessibilidadeController],
  providers: [AcessibilidadeService],
})
export class AcessibilidadeModule {}