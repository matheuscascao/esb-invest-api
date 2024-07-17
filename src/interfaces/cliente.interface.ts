export interface ICliente {
  id: number;
  nome: string;
  cpf: string;
  data_nascimento: Date;
  renda_estimada: number;
}

export interface IClienteCreate {
  nome: string;
  cpf: string;
  data_nascimento: Date;
  renda_estimada: number;
}

export interface IClienteRepository {
  create(data: IClienteCreate): Promise<ICliente>;
}
