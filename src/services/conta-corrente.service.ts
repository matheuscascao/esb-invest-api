import ContaCorrenteRepository from '../repositories/conta-corrente.repository';
import TransacaoRepository from '../repositories/transacao.repository';
import { ContaCorrente } from '@prisma/client';

class ContaCorrenteService {
  private contaCorrenteRepository: ContaCorrenteRepository;
  private transacaoRepository: TransacaoRepository;
  constructor() {
    this.contaCorrenteRepository = new ContaCorrenteRepository();
    this.transacaoRepository = new TransacaoRepository();
  }

  public async create({
    cliente_id,
    limite,
  }: Pick<ContaCorrente, 'cliente_id' | 'limite'>): Promise<ContaCorrente> {
    const result = await this.contaCorrenteRepository.create({
      cliente_id,
      limite,
    });
    return result;
  }

  public async findById(
    id: number
  ): Promise<ContaCorrente & { saldo: number }> {
    const result = await this.contaCorrenteRepository.findById(id);
    if (!result) {
      throw new Error('O cliente não existe');
    }
    const saldo = await this.transacaoRepository.calculaSaldo(id);
    return { ...result, saldo };
  }

  public async findAll(): Promise<ContaCorrente[] | null> {
    const result = await this.contaCorrenteRepository.findMany();
    return result;
  }
}

export default ContaCorrenteService;
