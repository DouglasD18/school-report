import request from 'supertest';
import app from '../../config/app';

import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper';
import { Bimestre, Disciplina, NoteBody } from '../../../domain/models';

const ROUTE = "/api/note/";

const BODY: NoteBody = {
  bimestre: Bimestre.TERCEIRO,
  disciplina: Disciplina.Sociologia,
  nota: 8
}

describe("ListNotes Route", () => {
  beforeAll(async () => {
    await MongoHelper.connect();
  })

  afterAll(async () => {
    const notesCollection = await MongoHelper.getCollection("notes");
    await notesCollection.deleteMany({});
    await MongoHelper.disconnect();
  })
  
  it("Should return the notes on success", async () => {
    const response = await request(app)
      .get(ROUTE);
      
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toBeFalsy();
  }) 

  it("Should return the notes on success", async () => {
    await request(app)
      .post(ROUTE)
      .send(BODY);

    const response = await request(app)
      .get(ROUTE);
      
    expect(response.statusCode).toBe(200);
    expect(response.body[0].nota).toEqual(BODY.nota);
    expect(response.body[0].nota).toEqual(BODY.nota);
    expect(response.body[0].nota).toEqual(BODY.nota);
    expect(response.body[0].id).toBeTruthy();
    expect(response.body[0].criadoEm).toBeTruthy();
    expect(response.body[0].atualizadoEm).toBeTruthy();
  }) 
})