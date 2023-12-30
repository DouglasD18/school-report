import { ListNotesRepository, Note, MongoHelper } from "./list-notes-protocols";

export class ListNotesMongoRepository implements ListNotesRepository {
  async handle(): Promise<Note[]> {
    const noteCollection = await MongoHelper.getCollection('notes');
    const result = await noteCollection.find({}).toArray();
    const notes = [];
    result.forEach(note => {
      const correct = {
        id: note._id,
        ...note
      }

      notes.push(correct);
    })
    
    return notes;
  }

}