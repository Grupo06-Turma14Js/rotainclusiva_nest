import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { AcessibilidadeModule } from './acessibilidade/acessibilidade.module';
import { Carona } from './carona/entities/carona.entity';
import { Acessibilidade } from './acessibilidade/entities/acessibilidade.entity';
import { CaronaModule } from './carona/carona.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    UsuarioModule,
    AcessibilidadeModule,
    CaronaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
