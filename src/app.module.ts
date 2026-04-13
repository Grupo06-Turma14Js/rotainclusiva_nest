import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { AcessibilidadeModule } from './acessibilidade/acessibilidade.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_rotainclusiva',
      entities: [Usuario],
      synchronize: true
    }),
    UsuarioModule,
    AuthModule,
    AcessibilidadeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
