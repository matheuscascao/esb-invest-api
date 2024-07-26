import {
  EventoTransacao,
  TipoTransacao,
  ProdutoFinanceiro,
  TransacaoInvestimento,
} from '@prisma/client';

export type ClienteCreate = {
  nome: string;
  cpf: string;
  data_nascimento: string;
  renda_estimada: number;
};

export type TransacaoCreate = {
  conta_corrente_id: number;
  valor: number;
  evento_transacao: EventoTransacao;
  tipo_transacao?: TipoTransacao;
};

export type ProdutoFinanceiroCreate = Omit<
  ProdutoFinanceiro,
  'id' | 'criado_em' | 'atualizado_em'
>;

export type TransacaoInvestimentoCreate = Omit<
  TransacaoInvestimento,
  'id' | 'criado_em' | 'atualizado_em' | 'resgatado'
>;
