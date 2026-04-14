import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { AcessibilidadeModule } from './acessibilidade/acessibilidade.module';
import { Carona } from './carona/entities/carona.entity';
import { Acessibilidade } from './acessibilidade/entities/acessibilidade.entity';
import { CaronaModule } from './carona/carona.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_rotainclusiva',
      entities: [Usuario, Carona, Acessibilidade],
      synchronize: true
    }),
    UsuarioModule,
    AcessibilidadeModule,
    CaronaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
