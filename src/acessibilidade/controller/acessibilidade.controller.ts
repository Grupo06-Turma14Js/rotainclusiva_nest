import { AcessibilidadeService } from '../service/acessibilidade.service';
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
import { Acessibilidade } from '../entities/acessibilidade.entity';

@Controller('/acessibilidades')
export class AcessibilidadeController {
  constructor(private readonly acessibilidadeService: AcessibilidadeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Acessibilidade[]> {
    return this.acessibilidadeService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Acessibilidade> {
    return this.acessibilidadeService.findById(id);
  }

  @Get('/tipo/:tipo')
  @HttpCode(HttpStatus.OK)
  findAllBydescricao(@Param('tipo') tipo: string): Promise<Acessibilidade[]> {
    return this.acessibilidadeService.findAllByTipo(tipo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() acessibilidade: Acessibilidade): Promise<Acessibilidade> {
    return this.acessibilidadeService.create(acessibilidade);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() acessibilidade: Acessibilidade): Promise<Acessibilidade> {
    return this.acessibilidadeService.update(acessibilidade);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.acessibilidadeService.delete(id);
  }
}
