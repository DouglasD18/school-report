import { BodyValidate, Validated, MissingParamError, InvalidParamError } from "./body-validate-protocols";

export class BodyValidateAdapter implements BodyValidate {
  handle(body: any): Validated {
    const fields = ["bimestre", "disciplina", "nota"];
    const bimestreChoices = ["PRIMEIRO", "SEGUNDO", "TERCEIRO", "QUARTO"];
    const disciplinaChoices = ["Biologia", "Artes", "Geografia", "Sociologia"];

    for (const field of fields) {
      if (!body[field]) {
        return {
          isValid: false,
          error: new MissingParamError(field)
        }
      }
    }

    if (!bimestreChoices.includes(body.bimestre)) {
      return {
        isValid: false,
        error: new InvalidParamError("bimestre", "'bimestre' must be a valid argument!")
      }
    } else if (!disciplinaChoices.includes(body.disciplina)) {
      return {
        isValid: false,
        error: new InvalidParamError("disciplina", "'disciplina' must be a valid discipline!")
      }
    } else if (typeof body.nota !== "number") {
      return {
        isValid: false,
        error: new InvalidParamError("nota", "'nota' must be a number!")
      }
    } else if (body.nota < 0 || body.nota > 10) {
      return {
        isValid: false,
        error: new InvalidParamError("nota", "'nota' must be between 0 and 10!")
      }
    }

    return {
      isValid: true
    }
  }
  
}
