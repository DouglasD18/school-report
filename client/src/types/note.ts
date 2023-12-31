export enum Bimestre {
  PRIMEIRO = "PRIMEIRO",
  SEGUNDO = "SEGUNDO",
  TERCEIRO = "TERCEIRO",
  QUARTO = "QUARTO"
}

export enum Disciplina {
  Biologia = "Biologia",
  Artes = "Artes",
  Geografia = "Geografia",
  Sociologia = "Sociologia"
}

export interface Note {
  id: string;
  criadoEm: Date;
  atualizadoEm: Date;
  bimestre: Bimestre;
  disciplina: Disciplina;
  nota: number;
}
