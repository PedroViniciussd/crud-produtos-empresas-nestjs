// src/empresa/empresa.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { IsPublic } from '../modules/auth/decorators/is-public.decorator';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}
@IsPublic()
  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }
@IsPublic()
  @Get()
  findAll() {
    return this.empresaService.findAll();
  }
@IsPublic()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.empresaService.findOne(id);
  }
@IsPublic()
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.update(id, updateEmpresaDto);
  }
@IsPublic()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.empresaService.remove(id);
  }
}
