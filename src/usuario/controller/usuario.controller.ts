import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entities/usuario.entity';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Busca todos os usuários cadastrados
  @Get()
  @HttpCode(HttpStatus.OK) // Status 200
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  // Busca um usuário específico pelo ID
  @Get('/:id')
  @HttpCode(HttpStatus.OK) // Status 200
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }

  // Cadastra um novo usuário
  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED) // Status 201
  async create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  // Atualiza os dados de um usuário existente
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK) // Status 200
  async update(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(usuario);
  }

  // Deleta um usuário pelo ID
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // Status 204 (Sem conteúdo no retorno)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usuarioService.delete(id);
  }
}
