import { AddNoteRepository, NoteBody, Note, MongoHelper } from "./add-note-protocols";

export class AddNoteMongoRepository implements AddNoteRepository {
  async handle(body: NoteBody): Promise<Note> {
    const dates =  {
      criadoEm: new Date(Date.now()),
      atualizadoEm: new Date(Date.now())
    }
    const payload = {
      ...body,
      ...dates
    }

    const noteCollection = await MongoHelper.getCollection('notes');
    const result = await noteCollection.insertOne(payload);

    return {
      ...payload,
      id: result.insertedId.toString()
    };
  }
  
}
