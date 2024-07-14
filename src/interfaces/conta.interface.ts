export interface IConta {
    id: number
    codigo: string
    status_conta: StatusConta
    tipo_conta: ContaTipo
    tipo_investidor?: InvestidorTipo
    clienteId: number
    limite: number
    saldo: number
    data_criacao: Date 
    data_atualizacao: Date
}

enum StatusConta {
    ATIVA = 'ATIVA',
    INATIVA = 'INATIVA',
    SUSPENSA = 'SUSPENSA',
    PENDENTE = 'PENDENTE',
}

enum ContaTipo {
    CORRENTE = 'CORRENTE',
    CONTAINVESTIMENTO = 'CONTAINVESTIMENTO',
}

enum InvestidorTipo {
    NORMAL = 'NORMAL',
    QUALIFICADO = 'QUALIFICADO',
}