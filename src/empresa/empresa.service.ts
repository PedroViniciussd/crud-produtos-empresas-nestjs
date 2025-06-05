// src/empresa/empresa.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEmpresaDto) {
    return this.prisma.empresa.create({ data });
  }

  async findAll() {
    return this.prisma.empresa.findMany();
  }

  async findOne(id: number) {
    const empresa = await this.prisma.empresa.findUnique({ where: { id } });
    if (!empresa) throw new NotFoundException(`Empresa ${id} não encontrada`);
    return empresa;
  }

  async update(id: number, data: UpdateEmpresaDto) {
    await this.findOne(id); // Verifica se existe
    return this.prisma.empresa.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    return this.prisma.empresa.delete({ where: { id } });
  }
}
