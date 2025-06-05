import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { IsPublic } from '../modules/auth/decorators/is-public.decorator';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}
@IsPublic()
  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }
@IsPublic()
  @Get()
  findAll() {
    return this.produtoService.findAll();
  }
@IsPublic()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.findOne(id);
  }
@IsPublic()
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(id, updateProdutoDto);
  }
@IsPublic()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.remove(id);
  }
}
