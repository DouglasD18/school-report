import { Bimestre, Disciplina, Note } from "../../../domain/models";
import { ListNotes, serverError } from "./list-node-protocols";
import { ListNotesController } from "./list-note";

const httpRequest = {}

const NOTE: Note = {
  id: "any_id",
  criadoEm: new Date(Date.now()),
  atualizadoEm: new Date(Date.now()),
  bimestre: Bimestre.TERCEIRO,
  disciplina: Disciplina.Sociologia,
  nota: 8
}

interface SutTypes {
  sut: ListNotesController
  listNotesStub: ListNotes
}

const makeListNotesStub = (): ListNotes => {
  class ListNotesStub implements ListNotes {
    handle(): Promise<Note[]> {
      return new Promise(resolve => resolve([NOTE]));
    }
  }

  return new ListNotesStub();
}

const makeSut = (): SutTypes => {
  const listNotesStub = makeListNotesStub();
  const sut = new ListNotesController(listNotesStub);

  return {
    sut,
    listNotesStub,
  }
}

describe('ListNotes Controller', () => {
  it('Should return 500 if ListNotes throws', async () => {
    const { sut, listNotesStub } = makeSut();
    
    jest.spyOn(listNotesStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError());
  });

  it('Should return 200 if valid values is provided.', async () => {
    const { sut } = makeSut();
    
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([NOTE]);
  });
});