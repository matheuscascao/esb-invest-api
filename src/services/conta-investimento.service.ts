import ContaInvestimentoRepository from '../repositories/conta-investimento.repository';
import ProdutoFinanceiroRepository from '../repositories/produto-financeiro.repository';
import TransacaoInvestimentoRepository from '../repositories/transacao-investimento.repository';
import { ContaInvestimento } from '@prisma/client';
import { TransacaoInvestimentoCreate } from '../types';
import TransacaoService from '../services/transacao.service'; // Adjust the path as necessary
class ContaInvestimentoService {
  private ContaInvestimentoRepository: ContaInvestimentoRepository;
  private ProdutoFinanceiroRepository: ProdutoFinanceiroRepository;
  private TransacaoInvestimentoRepository: TransacaoInvestimentoRepository;
  private TransacaoService: TransacaoService; // Inject TransacaoService

  constructor() {
    this.ContaInvestimentoRepository = new ContaInvestimentoRepository();
    this.ProdutoFinanceiroRepository = new ProdutoFinanceiroRepository();
    this.TransacaoInvestimentoRepository =
      new TransacaoInvestimentoRepository();
    this.TransacaoService = new TransacaoService(); // Initialize TransacaoService
  }

  public async create({
    cliente_id,
    tipo_investidor,
    conta_corrente_id,
  }: Pick<
    ContaInvestimento,
    'cliente_id' | 'tipo_investidor' | 'conta_corrente_id'
  >): Promise<ContaInvestimento> {
    const result = await this.ContaInvestimentoRepository.create({
      cliente_id,
      tipo_investidor,
      conta_corrente_id,
    });

    return result;
  }

  public async aplicaInvestimento({
    conta_investimento_id,
    produto_financeiro_id,
    quantidade,
  }: {
    conta_investimento_id: number;
    produto_financeiro_id: number;
    quantidade: number;
  }): Promise<void> {
    const produtoFinanceiro = await this.ProdutoFinanceiroRepository.findById(
      produto_financeiro_id
    );
    if (!produtoFinanceiro) {
      throw new Error('ProdutoFinanceiro not found');
    }
    const transacaoCountInvestimentoValida =
      await this.validateProdutoInvestimentoCount(
        produto_financeiro_id,
        quantidade
      );
    if (!transacaoCountInvestimentoValida) {
      throw new Error('ProdutoFinanceiro is not available');
    }

    const totalValue = quantidade * produtoFinanceiro?.preco_unitario;

    const contaCorrenteId = await this.getContaCorrenteId(
      conta_investimento_id
    );

    await this.TransacaoService.create({
      conta_corrente_id: contaCorrenteId,
      valor: -totalValue,
      evento_transacao: 'APLICACAO_INVESTIMENTO',
      tipo_transacao: 'SAIDA',
    });

    await this.TransacaoInvestimentoRepository.create({
      conta_investimento_id: conta_investimento_id,
      produto_financeiro_id: produto_financeiro_id,
      quantidade,
    });
  }

  private async getContaCorrenteId(
    contaInvestimentoId: number
  ): Promise<number> {
    const contaInvestimento = await this.ContaInvestimentoRepository.findById(
      contaInvestimentoId
    );
    if (!contaInvestimento) {
      throw new Error('ContaInvestimento not found');
    }
    return contaInvestimento.conta_corrente_id;
  }

  private async validateProdutoInvestimentoCount(
    produto_financeiro_id: number,
    quantidade: number
  ): Promise<boolean> {
    const produtoFinanceiroTransacoesCount =
      await this.TransacaoInvestimentoRepository.countTransacoesByProdutoFinanceiro(
        produto_financeiro_id
      );
    const produtoFinanceiro = await this.ProdutoFinanceiroRepository.findById(
      produto_financeiro_id
    );

    if (!produtoFinanceiro) {
      return false;
    }

    if (
      produtoFinanceiroTransacoesCount + quantidade >=
      produtoFinanceiro?.quantidade_cotas
    ) {
      return false;
    }
    return true;
  }

  public async getContaInvestimento(
    contaInvestimentoId: number
  ): Promise<ContaInvestimento | null> {
    const result = await this.ContaInvestimentoRepository.findById(
      contaInvestimentoId
    );
    return result;
  }

  public async calculateTotalReturns(
    contaInvestimentoId: number
  ): Promise<number> {
    const transactions =
      await this.TransacaoInvestimentoRepository.getTransacoes(
        contaInvestimentoId
      );
    console.log('Transactions: ', transactions);

    let totalReturns = 0;

    for (const transaction of transactions) {
      const produtoFinanceiro = await this.ProdutoFinanceiroRepository.findById(
        transaction.produto_financeiro_id
      );
      if (!produtoFinanceiro) {
        throw new Error('ProdutoFinanceiro not found');
      }

      const tempoDias = this.calculaDiferencaTempoDias(
        transaction.criado_em,
        new Date()
      );
      const currentValue = this.calcularValorPresente(
        transaction.quantidade,
        produtoFinanceiro.preco_unitario,
        produtoFinanceiro.rentabilidade_anual,
        tempoDias
      );

      totalReturns += currentValue;
    }

    return totalReturns;
  }

  private calculaDiferencaTempoDias(startDate: Date, endDate: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;

    const diffInMs = endDate.getTime() - startDate.getTime();

    const quantidadeDias = Math.floor(diffInMs / msPerDay);
    return quantidadeDias;
  }

  private calcularValorPresente(
    quantidade: number,
    precoUnitario: number,
    rentabilidadeAnual: number,
    quantidadeDias: number
  ): number {
    const investmentValue = quantidade * precoUnitario;

    const valorAtual =
      investmentValue * Math.pow(1 + rentabilidadeAnual, quantidadeDias / 365);

    console.log('Valor atual: ', valorAtual);
    return valorAtual;
  }
}

export default ContaInvestimentoService;
