import ContaInvestimentoRepository from '../repositories/conta-investimento.repository';
import ProdutoFinanceiroRepository from '../repositories/produto-financeiro.repository';
import TransacaoInvestimentoRepository from '../repositories/transacao-investimento.repository';
import { ContaInvestimento, TransacaoInvestimento } from '@prisma/client';
import { TransacaoInvestimentoCreate } from '../types';
import TransacaoService from '../services/transacao.service'; // Adjust the path as necessary
class ContaInvestimentoService {
  private ContaInvestimentoRepository: ContaInvestimentoRepository;
  private ProdutoFinanceiroRepository: ProdutoFinanceiroRepository;
  private TransacaoInvestimentoRepository: TransacaoInvestimentoRepository;
  private TransacaoService: TransacaoService;

  constructor() {
    this.ContaInvestimentoRepository = new ContaInvestimentoRepository();
    this.ProdutoFinanceiroRepository = new ProdutoFinanceiroRepository();
    this.TransacaoInvestimentoRepository =
      new TransacaoInvestimentoRepository();
    this.TransacaoService = new TransacaoService();
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

  public async calculateretornoTotalAtual(
    contaInvestimentoId: number
  ): Promise<{
    computadoTransacoesPendentes: number;
    computadoTransacoesResgatadas: number;
  }> {
    const transacoesPendentes =
      await this.TransacaoInvestimentoRepository.getTransacoes(
        contaInvestimentoId,
        false
      );
    const computadoTransacoesPendentes = await this.computaValorTransacoes(
      transacoesPendentes
    );

    const transacoesResgatadas =
      await this.TransacaoInvestimentoRepository.getTransacoes(
        contaInvestimentoId,
        true
      );
    const computadoTransacoesResgatadas =
      await this.computaValorTransacoesPassadas(transacoesResgatadas);

    return { computadoTransacoesPendentes, computadoTransacoesResgatadas };
  }

  private async computaValorTransacoes(
    transacoes: TransacaoInvestimento[]
  ): Promise<number> {
    let computado = 0;
    for (const transaction of transacoes) {
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
      const valorAtual = this.calcularValorPresente(
        transaction.quantidade,
        produtoFinanceiro.preco_unitario,
        produtoFinanceiro.rentabilidade_anual,
        tempoDias
      );

      computado += valorAtual;
    }
    return computado;
  }

  private async computaValorTransacoesPassadas(
    transacoes: TransacaoInvestimento[]
  ): Promise<number> {
    let computado = 0;
    for (const transaction of transacoes) {
      const produtoFinanceiro = await this.ProdutoFinanceiroRepository.findById(
        transaction.produto_financeiro_id
      );
      if (!produtoFinanceiro) {
        throw new Error('ProdutoFinanceiro not found');
      }

      const tempoDias = this.calculaDiferencaTempoDias(
        transaction.criado_em,
        produtoFinanceiro.data_resgate
      );
      const valorAtual = this.calcularValorPresente(
        transaction.quantidade,
        produtoFinanceiro.preco_unitario,
        produtoFinanceiro.rentabilidade_anual,
        tempoDias
      );

      computado += valorAtual;
    }
    return computado;
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

  public async resgataInvestimento(): Promise<number> {
    const produtosFinanceirosDataResgateHoje =
      await this.ProdutoFinanceiroRepository.findByDataResgate(new Date());
    const produtosFinanceirosIds = produtosFinanceirosDataResgateHoje.map(
      (produto) => produto.id
    );

    const transacoesNaoResgatadas =
      await this.TransacaoInvestimentoRepository.getTransacoesNaoResgatadasByProdutoFinanceiro(
        produtosFinanceirosIds
      );
    for (const transaction of transacoesNaoResgatadas) {
      const produtoFinanceiroId = transaction.produto_financeiro_id;
      const produtoFinanceiro = await this.ProdutoFinanceiroRepository.findById(
        produtoFinanceiroId
      );
      if (!produtoFinanceiro) {
        throw new Error('ProdutoFinanceiro not found');
      }
      const tempoDias = this.calculaDiferencaTempoDias(
        transaction.criado_em,
        new Date()
      );

      const valorAtual = this.calcularValorPresente(
        transaction.quantidade,
        produtoFinanceiro.preco_unitario,
        produtoFinanceiro.rentabilidade_anual,
        tempoDias
      );

      const contaCorrenteId = await this.getContaCorrenteId(
        transaction.conta_investimento_id
      );

      this.TransacaoService.create({
        conta_corrente_id: contaCorrenteId,
        valor: valorAtual,
        evento_transacao: 'RESGATE_INVESTIMENTO',
      });

      await this.TransacaoInvestimentoRepository.updateResgate(transaction.id);
    }

    return transacoesNaoResgatadas.length;
  }
}

export default ContaInvestimentoService;
