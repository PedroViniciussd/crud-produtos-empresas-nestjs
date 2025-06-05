import { IsNotEmpty, IsNumber, IsInt, IsString, IsPositive } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNumber()
  @IsPositive()
  preco: number;

  @IsInt()
  empresaId: number;
}
