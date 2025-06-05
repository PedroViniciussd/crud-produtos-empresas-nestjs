import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsOptional()
  @IsString()
  telefone?: string;
}
