import { DeleteNoteAdapter } from "./delete-note";
import { DeleteNoteRepository, NotFoundError } from "./delete-note-protocols";

const ID = "any_id";

const makeDeleteNoteRepository = (): DeleteNoteRepository => {
  class DeleteNoteRepositoryStub implements DeleteNoteRepository {
    handle(id: string): Promise<boolean> {
      return new Promise(resolve => resolve(true));
    }
  }

  return new DeleteNoteRepositoryStub();
}

interface SutTypes {
  sut: DeleteNoteAdapter
  deleteNoteRepositoryStub: DeleteNoteRepository
}

const makeSut = (): SutTypes => {
  const deleteNoteRepositoryStub = makeDeleteNoteRepository();
  const sut = new DeleteNoteAdapter(deleteNoteRepositoryStub);

  return {
    sut,
    deleteNoteRepositoryStub
  }
}

describe("DeleteNote Adapter", () => {
  it("Should call DeleteNoteRepository with correct values", async () => {
    const { sut, deleteNoteRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(deleteNoteRepositoryStub, "handle");
    await sut.handle(ID);

    expect(repositorySpy).toHaveBeenCalledWith(ID);
  })

  it("Should throws if note not exists", async () => {
    const { sut, deleteNoteRepositoryStub } = makeSut();

    jest.spyOn(deleteNoteRepositoryStub, "handle").mockReturnValueOnce(new Promise(resolve => resolve(false)));

    try {
      await sut.handle("Novo Produto");
    } catch (error) { 
      expect(error).toBeInstanceOf(NotFoundError);
    }

  })


  it("Should throw if DeleteNoteRepository throws", async () => {
    const { sut, deleteNoteRepositoryStub } = makeSut();

    jest.spyOn(deleteNoteRepositoryStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const promise = sut.handle(ID);

    expect(promise).rejects.toThrow();
  })

  it("Should return the correct values on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(ID);

    expect(response).toBeFalsy();
  })
})