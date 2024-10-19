export interface Edicao {
  criterios: Criterios
  video_libras: string
  video_libras_aparato: string
  linhas: Linha[]
}

export interface Criterios {
  enumeracao_por_linha: number
  orientacao_titulo: string
  texto_criterios?: string[]
}

export interface Linha {
  tipo: string
  texto_critico?: string
  aparato?: Aparato[]
}

export interface Aparato {
  tipo: string
  posicao: string
  conteudo: string
  codigo: string
  referencia: Referencia
}

export interface Referencia {
  codigo: string;
  link: string;
}

export interface Publicacao {
  codigo: string
  data: string
  local: string
  circulacao: string
  suporte: string
  titulo: string
  encontrado_em: EncontradoEm
  audio_descricao: String
  nome_autor: string
  texto: string[]
}

export interface EncontradoEm {
  tipo: string
  local: string
}

export interface JsonFormData {
  titulo: string
  tipo: string
  autor: string
  codigo: string
  edicao: Edicao[]
  publicacao: Publicacao[]
}
