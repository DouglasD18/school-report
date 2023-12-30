import { DeleteNoteController } from "./delete-note";
import { DeleteNote, HttpRequest, MissingParamError, NotFoundError, notFound, serverError } from "./delete-note-protocols";

const ID = {
  id: "any_id"
};

interface SutTypes {
  sut: DeleteNoteController
  deleteNoteStub: DeleteNote
}

const makeDeleteNoteStub = (): DeleteNote => {
  class DeleteNoteStub implements DeleteNote {
    handle(id: string): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new DeleteNoteStub();
}

const makeSut = (): SutTypes => {
  const deleteNoteStub = makeDeleteNoteStub();
  const sut = new DeleteNoteController(deleteNoteStub);

  return {
    sut,
    deleteNoteStub
  }
}

describe('DeleteNote Controller', () => {
  it("Should return 400 if id param is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {}

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('id'));
  })

  it("Should call DeleteNote with correct values", async () => {
    const { sut, deleteNoteStub } = makeSut();
    const httpRequest = {
      params: ID
    }

    const deleteNoteSpy = jest.spyOn(deleteNoteStub, "handle");
    await sut.handle(httpRequest);

    expect(deleteNoteSpy).toHaveBeenCalledWith(ID.id);
  });

  it('Should return throw with NotFoundError', async () => {
    const { sut, deleteNoteStub } = makeSut();
    const httpRequest = {
      params: ID
    }
    
    jest.spyOn(deleteNoteStub, "handle").mockImplementationOnce(() => {
      throw new NotFoundError();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(notFound());
  });

  it('Should return 500 if DeleteNote throws', async () => {
    const { sut, deleteNoteStub } = makeSut();
    const httpRequest = {
      params: ID
    }
    
    jest.spyOn(deleteNoteStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError());
  });

  it('Should return 204 if valid values is provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: ID
    }
    
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(204);
    expect(httpResponse.body).toBe("No Content");
  });
});