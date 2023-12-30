import { AddNoteAdapter } from "./add-note";
import { AddNoteRepository, Bimestre, Disciplina, Note, NoteBody } from "./add-note-protocols";

const BODY: NoteBody = {
  bimestre: Bimestre.PRIMEIRO,
  disciplina: Disciplina.Geografia,
  nota: 7.5
}

const NOTE: Note = {
  id: "any_id",
  criadoEm: new Date(Date.now()),
  atualizadoEm: new Date(Date.now()),
  bimestre: BODY.bimestre,
  disciplina: BODY.disciplina,
  nota: BODY.nota
}

const makeAddNoteRepository = (): AddNoteRepository => {
  class AddNoteRepositoryStub implements AddNoteRepository {
    handle(body: NoteBody): Promise<Note> {
      return new Promise(resolve => resolve(NOTE));
    }
  }

  return new AddNoteRepositoryStub();
}

interface SutTypes {
  sut: AddNoteAdapter
  addNoteRepositoryStub: AddNoteRepository
}

const makeSut = (): SutTypes => {
  const addNoteRepositoryStub = makeAddNoteRepository();
  const sut = new AddNoteAdapter(addNoteRepositoryStub);

  return {
    sut,
    addNoteRepositoryStub
  }
}

describe("AddNoteAdapter", () => {
  it("Should AddNoteRepository with correct values", async () => {
    const { sut, addNoteRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(addNoteRepositoryStub, "handle");
    await sut.handle(BODY);

    expect(repositorySpy).toHaveBeenCalledWith(BODY);
  })

  it("Should throw if AddNoteRepository throws", async () => {
    const { sut, addNoteRepositoryStub } = makeSut();

    jest.spyOn(addNoteRepositoryStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const promise = sut.handle(BODY);

    expect(promise).rejects.toThrow();
  })

  it("Should return the correct values on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(BODY);

    expect(response).toEqual(NOTE);
  })
})