import { Controller, AddNote, BodyValidate, HttpRequest, HttpResponse, badRequest, created, serverError } from "./add-note-protocols";

export class AddNoteController implements Controller {
  constructor(
    private addNote: AddNote,
    private bodyValidate: BodyValidate
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validated = this.bodyValidate.handle(httpRequest.body);

    if (!validated.isValid) {
      return badRequest(validated.error!);
    }

    try {
      const note = await this.addNote.handle(httpRequest.body);

      return created(note);
    } catch (error) {
      return serverError();
    }
  }
}
