import { ListNotesMongoRepository } from "./list-notes";
import { Bimestre, Disciplina, ListNotesRepository, MongoHelper } from "./list-notes-protocols";

const payload = {
  bimestre: Bimestre.PRIMEIRO,
  disciplina: Disciplina.Geografia,
  nota: 7.5,
  criadoEm: new Date(Date.now()),
  atualizadoEm: new Date(Date.now())
}

const makeSut = (): ListNotesRepository => {
  return new ListNotesMongoRepository();
}

describe("ListNotesMongoRepository", () => {
  beforeAll(async () => {
    await MongoHelper.connect();
    const noteCollection = await MongoHelper.getCollection('notes');
    await noteCollection.insertOne(payload);
  })

  afterAll(async () => {
    const NoteCollection = await MongoHelper.getCollection('notes');
    await NoteCollection.deleteMany({});
    await MongoHelper.disconnect();
  })

  it("Should return an array of note on success", async () => {
    const sut = makeSut();

    const notes = await sut.handle();

    expect(notes).toBeTruthy();
    expect(notes[0]).toBeTruthy();
  })

  it("Should return an note with correct properties", async () => {
    const sut = makeSut();

    const notes = await sut.handle();

    expect(notes.length).toBe(1);
    expect(notes[0].nota).toEqual(payload.nota);
    expect(notes[0].bimestre).toEqual(payload.bimestre);
    expect(notes[0].disciplina).toEqual(payload.disciplina);
    expect(notes[0].id).toBeTruthy();
    expect(notes[0].criadoEm).toBeTruthy();
    expect(notes[0].atualizadoEm).toBeTruthy();
  })
})