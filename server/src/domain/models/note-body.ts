export enum Bimestre {
  PRIMEIRO,
  SEGUNDO,
  TERCEIRO,
  QUARTO
}

export enum Disciplina {
  BIOLOGIA = "Biologia",
  ARTES = "Artes",
  GEOGRAFIA = "Geografia",
  SOCIOLOGIA = "Sociologia"
}

export interface NoteBody {
  bimestre: Bimestre;
  disciplina: Disciplina;
  nota: number;
}
