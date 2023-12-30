import { BodyValidateAdapter } from "./body-validate";
import { Bimestre, Disciplina, InvalidParamError, MissingParamError, NoteBody } from "./body-validate-protocols";

const sut = new BodyValidateAdapter();

const BODY: NoteBody = {
  bimestre: Bimestre.PRIMEIRO,
  disciplina: Disciplina.Geografia,
  nota: 7.5
}

describe("BodyValidate", () => {
  it("Should return a MissingParamError if nota is no provided", () => {
    const validated = sut.handle({
      bimestre: BODY.bimestre,
      disciplina: BODY.disciplina
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new MissingParamError("nota"));
  });

  it("Should return a MissingParamError if bimestre is no provided", () => {
    const validated = sut.handle({
      nota: BODY.nota,
      disciplina: BODY.disciplina
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new MissingParamError("bimestre"));
  });

  it("Should return a MissingParamError if disciplina is no provided", () => {
    const validated = sut.handle({
      nota: BODY.nota,
      bimestre: BODY.bimestre
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new MissingParamError("disciplina"));
  });

  it("Should return a InvalidParamError if bimestre is invalid", () => {
    const validated = sut.handle({
      nota: BODY.nota,
      bimestre: "Segundo",
      disciplina: BODY.disciplina
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new InvalidParamError("bimestre", "'bimestre' must be a valid argument!"));
  });

  it("Should return a InvalidParamError if disciplina is invalid", () => {
    const validated = sut.handle({
      nota: BODY.nota,
      bimestre: BODY.bimestre,
      disciplina: "História"
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new InvalidParamError("disciplina", "'disciplina' must be a valid discipline!"));
  });

  it("Should return a InvalidParamError if nota is not a number", () => {
    const validated = sut.handle({
      nota: "Sete",
      bimestre: BODY.bimestre,
      disciplina: BODY.disciplina
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new InvalidParamError("nota", "'nota' must be a number!"));
  });

  it("Should return a InvalidParamError if nota is a invalid number", () => {
    const validated = sut.handle({
      nota: 12,
      bimestre: BODY.bimestre,
      disciplina: BODY.disciplina
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new InvalidParamError("nota", "'nota' must be between 0 and 10!"));
  });

  it("Should return true with all params are valid", () => {
    const validated = sut.handle(BODY);

    expect(validated.isValid).toBe(true);
    expect(validated.error).toBeFalsy();
  })
})