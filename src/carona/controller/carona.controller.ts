import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Param, Body, HttpException, UseGuards, ParseIntPipe } from "@nestjs/common";
import { CaronaService } from "../service/carona.service";
import { Carona } from "../entities/carona.entity";


@Controller("/caronas")
export class CaronaController {
  constructor(private readonly caronaService: CaronaService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Carona[]> {
    return this.caronaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Carona> {
    return this.caronaService.findById(id);
  }

  @Get('/origem/:origem')
  @HttpCode(HttpStatus.OK)
  findAllByOrigem(@Param('origem') origem: string): Promise<Carona[]> {
    return this.caronaService.findAllByOrigem(origem);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() carona: Carona): Promise<any> {
    return this.caronaService.create(carona);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() carona: Carona): Promise<any> {
    return this.caronaService.update(carona);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.caronaService.delete(id);
  }

}