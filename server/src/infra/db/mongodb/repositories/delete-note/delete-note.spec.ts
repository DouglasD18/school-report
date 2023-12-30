import { DeleteNoteRepository } from "../../../../../data/protocols";
import { Bimestre, Disciplina, NoteBody } from "../../../../../domain/models";
import { MongoHelper } from "../../helpers/mongo-helper";
import { DeleteNoteMongoRepository } from "./delete-note";

const BODY: NoteBody = {
  bimestre: Bimestre.PRIMEIRO,
  disciplina: Disciplina.Geografia,
  nota: 7.5
}

const makeSut = (): DeleteNoteRepository => {
  return new DeleteNoteMongoRepository();
}

describe("DeleteNoteMongoRepository", () => {
  afterAll(async () => {
    const NoteCollection = await MongoHelper.getCollection('notes');
    await NoteCollection.deleteMany({});
    await MongoHelper.disconnect();
  })

  it("Should return false if do not delete the note", async () => {
    const sut = makeSut();

    const response = await sut.handle("658f9e38eaa866553cfa4bed");

    expect(response).toBe(false);
  })

  it("Should delete the Note", async () => {
    const NoteCollection = await MongoHelper.getCollection('notes');
    const inserted = await NoteCollection.insertOne(BODY);
    const id = inserted.insertedId;
    
  
    const sut = makeSut();

    const result = await sut.handle(id.toString());
    expect(result).toBe(true);

    const note = await NoteCollection.findOne({ _id: id });

    expect(note).toBeFalsy();
  })
})