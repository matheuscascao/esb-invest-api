import { ICliente, IClienteCreate } from "../interfaces/cliente.interface";
import { ClienteRepository } from "../repositories/cliente.repository";

class ClienteService {
    private clienteReposity: ClienteRepository
    constructor(){
        this.clienteReposity = new ClienteRepository();
    }

    public async create({name, cpf, data_nascimento, renda_estimada}: IClienteCreate): Promise<ICliente> {
        const verifyClientExists = await this.clienteReposity.findByCpf(cpf);
        if(verifyClientExists) {
            throw new Error('O cliente já existe')
        }
        const result = await this.clienteReposity.create({name, cpf, data_nascimento, renda_estimada})

        return result;
    }
}

export {ClienteService}