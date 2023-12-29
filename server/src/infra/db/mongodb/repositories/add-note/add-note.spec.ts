import { AddNoteMongoRepository } from "./add-note";
import { Bimestre, Disciplina, MongoHelper, NoteBody } from "./add-note-protocols";

const BODY: NoteBody = {
  bimestre: Bimestre.PRIMEIRO,
  disciplina: Disciplina.Geografia,
  nota: 7.5
}

const makeSut = () => new AddNoteMongoRepository();

describe("AddNoteMongoRepository", () => {
  afterAll(async () => {
    const noteCollection = await MongoHelper.getCollection('notes');
    await noteCollection.deleteMany({});
    await MongoHelper.disconnect();
  })

  beforeEach(async () => {
    const noteCollection = await MongoHelper.getCollection('notes');
    await noteCollection.deleteMany({});
  })

  it("Should return an note on success", async () => {
    const sut = makeSut();

    const note = await sut.handle(BODY);

    expect(note).toBeTruthy();
  })

  it("Should return an note with correct properties", async () => {
    const sut = makeSut();

    const note = await sut.handle(BODY);

    expect(note.bimestre).toEqual(BODY.bimestre);
    expect(note.nota).toEqual(BODY.nota);
    expect(note.disciplina).toEqual(BODY.disciplina);
    expect(note.id).toBeTruthy();
    expect(note.criadoEm).toBeTruthy();
    expect(note.atualizadoEm).toBeTruthy();
  })
})