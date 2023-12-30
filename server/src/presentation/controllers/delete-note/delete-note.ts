import { Controller, HttpRequest, HttpResponse, badRequest, MissingParamError, noContent, serverError, DeleteNote, notFound } from "./delete-note-protocols";

export class DeleteNoteController implements Controller {
  constructor(private deleteNote: DeleteNote) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = httpRequest.params?.id;
    
    if (!id) {
      return badRequest(new MissingParamError("id"));
    } 

    try {
      await this.deleteNote.handle(id);
      return noContent();
    } catch (error) {
      if (error instanceof Error && error.name === "NotFoundError") {
        return notFound();
      }

      return serverError();
    }
  }
  
}