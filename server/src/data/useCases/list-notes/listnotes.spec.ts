import { ListNotesAdapter } from "./list-notes";
import { Bimestre, Disciplina, ListNotesRepository, Note } from "./list-notes-protocols";

const NOTE: Note = {
  id: "any_id",
  criadoEm: new Date(Date.now()),
  atualizadoEm: new Date(Date.now()),
  bimestre: Bimestre.TERCEIRO,
  disciplina: Disciplina.Sociologia,
  nota: 8
}

const makeListNotesRepositoryStub = (): ListNotesRepository => {
  class ListNotesRepositoryStub implements ListNotesRepository {
    handle(): Promise<Note[]> {
      return new Promise(resolve => resolve([NOTE]));
    }
  }

  return new ListNotesRepositoryStub();
}

interface SutTypes {
  sut: ListNotesAdapter
  listNotesRepositoryStub: ListNotesRepository
}

const makeSut = (): SutTypes => {
  const listNotesRepositoryStub = makeListNotesRepositoryStub();
  const sut = new ListNotesAdapter(listNotesRepositoryStub);

  return {
    sut,
    listNotesRepositoryStub
  }
}

describe("ListNotes Adapter", () => {
  it("Should throw if ListNotesRepository throws", async () => {
    const { sut, listNotesRepositoryStub} = makeSut();

    jest.spyOn(listNotesRepositoryStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const promise = sut.handle();

    expect(promise).rejects.toThrow();
  })

  it("Should return the correct values on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle();

    expect(response).toEqual([NOTE]);
  })
})