import { Aparato } from '../../model/jsonText';

export interface TextoComAparatoPerIndex {
  textoComAparatos: TextoComAparato[];
  index: number;
  hasAparato: boolean
}


export interface TextoComAparato {
  conteudo: string;
  aparato?: Aparato;
  beggining: number;
  end: number;
}
