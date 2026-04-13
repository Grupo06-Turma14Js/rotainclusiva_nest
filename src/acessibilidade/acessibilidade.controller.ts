import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AcessibilidadeService } from './acessibilidade.service';
import { CreateAcessibilidadeDto } from './dto/create-acessibilidade.dto';
import { UpdateAcessibilidadeDto } from './dto/update-acessibilidade.dto';

@Controller('acessibilidade')
export class AcessibilidadeController {
  constructor(private readonly acessibilidadeService: AcessibilidadeService) {}

  @Post()
  create(@Body() createAcessibilidadeDto: CreateAcessibilidadeDto) {
    return this.acessibilidadeService.create(createAcessibilidadeDto);
  }

  @Get()
  findAll() {
    return this.acessibilidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acessibilidadeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAcessibilidadeDto: UpdateAcessibilidadeDto,
  ) {
    return this.acessibilidadeService.update(+id, updateAcessibilidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acessibilidadeService.remove(+id);
  }
}
