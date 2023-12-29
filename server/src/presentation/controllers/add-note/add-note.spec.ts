import { Bimestre, Disciplina, Note, NoteBody, Validated } from "../../../domain/models"
import { InvalidParamError, MissingParamError } from "../../errors"
import { AddNoteController } from "./add-note"
import { AddNote, BodyValidate, serverError } from "./add-note-protocols"

const VALIDATED: Validated = {
  isValid: true
}

const NOTE_BODY: NoteBody = {
  bimestre: Bimestre.TERCEIRO,
  disciplina: Disciplina.SOCIOLOGIA,
  nota: 8
}

const NOTE: Note = {
  id: "any_id",
  criadoEm: new Date(Date.now()),
  atualizadoEm: new Date(Date.now()),
  bimestre: NOTE_BODY.bimestre,
  disciplina: NOTE_BODY.disciplina,
  nota: NOTE_BODY.nota
}

interface SutTypes {
  sut: AddNoteController
  addNoteStub: AddNote
  bodyValidateStub: BodyValidate
}

const makeAddNoteStub = (): AddNote => {
  class AddNoteStub implements AddNote {
    handle(body: NoteBody): Promise<Note> {
      return new Promise(resolve => resolve(NOTE));
    }
  }

  return new AddNoteStub();
}

const makeBodyValidateStub = (): BodyValidate => {
  class BodyValidateStub implements BodyValidate {
    handle(body: any): Validated {
      return(VALIDATED);
    }
  }

  return new BodyValidateStub();
}

const makeSut = (): SutTypes => {
  const bodyValidateStub = makeBodyValidateStub();
  const addNoteStub = makeAddNoteStub();
  const sut = new AddNoteController(addNoteStub, bodyValidateStub);

  return {
    sut,
    addNoteStub,
    bodyValidateStub
  }
}

describe('AddNote Controller', () => {
  it("Should call BodyValidate with correct values", async () => {
    const { sut, bodyValidateStub } = makeSut();
    const httpRequest = {
      body: NOTE_BODY
    }

    const bodyValidateSpy = jest.spyOn(bodyValidateStub, "handle");
    await sut.handle(httpRequest);

    expect(bodyValidateSpy).toHaveBeenCalledWith(NOTE_BODY);
  });

  it('Should return 400 if any param is no provided', async () => {
    const { sut, bodyValidateStub } = makeSut();
    const httpRequest = {
      body: NOTE_BODY
    }

    const validated: Validated = {
      isValid: false,
      error: new MissingParamError("nota")
    }

    jest.spyOn(bodyValidateStub, "handle").mockReturnValue(validated);
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('nota'));
  });

  it('Should return 400 if any param is invalid', async () => {
    const { sut, bodyValidateStub } = makeSut();
    const httpRequest = {
      body: NOTE_BODY
    }

    const validated: Validated = {
      isValid: false,
      error: new InvalidParamError("nota", "'nota' must be a number")
    }

    jest.spyOn(bodyValidateStub, "handle").mockReturnValue(validated);
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("nota", "'nota' must be a number"));
  });

  it("Should call AddNote with correct values", async () => {
    const { sut, addNoteStub } = makeSut();
    const httpRequest = {
      body: NOTE_BODY
    }

    const addNoteSpy = jest.spyOn(addNoteStub, "handle");
    await sut.handle(httpRequest);

    expect(addNoteSpy).toHaveBeenCalledWith(NOTE_BODY);
  });

  it('Should return 500 if AddNote throws', async () => {
    const { sut, addNoteStub } = makeSut();
    const httpRequest = {
      body: NOTE_BODY
    }
    
    jest.spyOn(addNoteStub, "handle").mockImplementation(() => {
      throw new Error();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError());
  });

  it('Should return 201 if valid values is provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: NOTE_BODY
    }
    
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual(NOTE);
  });
});