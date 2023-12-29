import { AddNoteRepository, NoteBody, Note, MongoHelper } from "./add-note-protocols";

export class AddNoteMongoRepository implements AddNoteRepository {
  async handle(body: NoteBody): Promise<Note> {
    const noteCollection = await MongoHelper.getCollection('notes');
    const result = await noteCollection.insertOne(body);
    return {
      ...body,
      criadoEm: new Date(Date.now()),
      atualizadoEm: new Date(Date.now()),
      id: result.insertedId.toString()
    };
  }
  
}
