import { Controller, ListNotes, HttpRequest, HttpResponse, ok, serverError } from "./list-node-protocols";

export class ListNotesController implements Controller {
  constructor(private listNotes: ListNotes) {}

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const notes = await this.listNotes.handle();
      return ok(notes);
    } catch (error) {
      return serverError();
    }
  }
  
}