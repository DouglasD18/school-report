import request from 'supertest';
import app from '../../config/app';

import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper';
import { NoteBody, Bimestre, Disciplina } from '../../../domain/models';

const ROUTE = "/api/note/";

const BODY: NoteBody = {
  bimestre: Bimestre.TERCEIRO,
  disciplina: Disciplina.Sociologia,
  nota: 8
}

describe("UpdateNote Route", () => {
  afterAll(async () => {
    const notesCollection = await MongoHelper.getCollection("notes");
    await notesCollection.deleteMany({});
    await MongoHelper.disconnect();
  })

  it("Should return 400 if id is missing in params", async () => {
    const response = await request(app)
      .delete(ROUTE);

    expect(response.statusCode).toBe(400);
  })

  it("Should return 404 if note do not exists",async () => {
    const response = await request(app)
      .delete(ROUTE + "/658f9e38eaa866553cfa4bed");
      
    expect(response.statusCode).toBe(404);
  })

  it("Should return the note on success", async () => {
    const notesCollection = await MongoHelper.getCollection("notes");
    const id = (await notesCollection.insertOne(BODY)).insertedId;
    
    const response = await request(app)
      .delete(ROUTE + id.toString());
      
    expect(response.statusCode).toBe(204);
  }) 
})