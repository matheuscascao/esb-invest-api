import ContaCorrenteRepository from '../repositories/conta-corrente.repository';
import TransacaoRepository from '../repositories/transacao.repository';
import { ContaCorrente, Transacao } from '@prisma/client';
import TransacaoService from '../services/transacao.service';

class ContaCorrenteService {
  private contaCorrenteRepository: ContaCorrenteRepository;
  private transacaoRepository: TransacaoRepository;
  private transacaoService: TransacaoService;
  constructor() {
    this.contaCorrenteRepository = new ContaCorrenteRepository();
    this.transacaoRepository = new TransacaoRepository();
    this.transacaoService = new TransacaoService();
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

  public async getTransacoes(conta_corrente_id: number): Promise<Transacao[]> {
    const result = await this.transacaoRepository.getTransacoes(
      conta_corrente_id
    );
    return result;
  }

  public async findAll(): Promise<ContaCorrente[] | null> {
    const result = await this.contaCorrenteRepository.findMany();
    return result;
  }

  public async transferirFundos({
    contaOrigemId,
    contaDestinoId,
    valor,
  }: {
    contaOrigemId: number;
    contaDestinoId: number;
    valor: number;
  }): Promise<void> {
    await this.transacaoService.create({
      conta_corrente_id: contaOrigemId,
      valor: -valor,
      evento_transacao: 'SAQUE_CORRENTE',
    });

    await this.transacaoService.create({
      conta_corrente_id: contaDestinoId,
      valor: valor,
      evento_transacao: 'DEPOSITO_CORRENTE',
    });
  }
}

export default ContaCorrenteService;
