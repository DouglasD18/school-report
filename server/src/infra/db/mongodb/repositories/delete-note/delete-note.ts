import { ObjectId } from "mongodb";
import { DeleteNoteRepository } from "../../../../../data/protocols";
import { MongoHelper } from "../../helpers/mongo-helper";

export class DeleteNoteMongoRepository implements DeleteNoteRepository {
  async handle(id: string): Promise<boolean> {
    const noteCollection = await MongoHelper.getCollection("notes");
    const deleted = await noteCollection.findOneAndDelete({ _id: new ObjectId(id) });

    return deleted !== null ? true : false;
  }
  
}
