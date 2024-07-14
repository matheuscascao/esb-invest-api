export interface ICliente {
    id: number
    name: string
    cpf: string
    data_nascimento: string
    renda_estimada: number
}

export interface IClienteCreate {
    name: string
    cpf: string
    data_nascimento: string
    renda_estimada: number
}

export interface IClienteRepository {
    create(data: IClienteCreate): Promise<ICliente>
}