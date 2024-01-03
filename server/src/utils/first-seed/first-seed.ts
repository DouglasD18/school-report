import { Bimestre, Disciplina, NoteBody } from "../../domain/models";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import env from "../../main/config/env";

const { url } = env;

const notes: NoteBody[] = [
  {
    disciplina: Disciplina.Biologia,
    bimestre: Bimestre.PRIMEIRO,
    nota: 5
  },
  {
    disciplina: Disciplina.Artes,
    bimestre: Bimestre.PRIMEIRO,
    nota: 5
  },
  {
    disciplina: Disciplina.Geografia,
    bimestre: Bimestre.PRIMEIRO,
    nota: 5
  },
  {
    disciplina: Disciplina.Sociologia,
    bimestre: Bimestre.PRIMEIRO,
    nota: 5.9
  },
  {
    disciplina: Disciplina.Biologia,
    bimestre: Bimestre.SEGUNDO,
    nota: 6.7
  },
  {
    disciplina: Disciplina.Artes,
    bimestre: Bimestre.SEGUNDO,
    nota: 7
  },
  {
    disciplina: Disciplina.Geografia,
    bimestre: Bimestre.SEGUNDO,
    nota: 7.9
  },
  {
    disciplina: Disciplina.Sociologia,
    bimestre: Bimestre.SEGUNDO,
    nota: 8.2
  }
]

export default async () => {
  const notesColletion = await MongoHelper.getCollection("notes");
  await notesColletion.deleteMany({});

  notes.forEach(async note => {
    await fetch(url, {
      method: "post",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" }
    });
  })
}
