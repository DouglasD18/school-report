import request from 'supertest';
import app from '../../config/app';

import { Bimestre, Disciplina, NoteBody } from '../../../domain/models';
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper';

const ROUTE = "/api/note/";

const BODY: NoteBody = {
  bimestre: Bimestre.TERCEIRO,
  disciplina: Disciplina.Sociologia,
  nota: 8
}

const { nota, disciplina, bimestre } = BODY;


describe("AddNote Route", () => {
  afterAll(async () => {
    const notesCollection = await MongoHelper.getCollection("notes");
    await notesCollection.deleteMany({});
    await MongoHelper.disconnect();
  })

  beforeEach(async () => {
    const notesCollection = await MongoHelper.getCollection("notes");
    await notesCollection.deleteMany({});
  })
  
  it("Should return 400 if note is missing", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({ disciplina, bimestre });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if disciplina is missing", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({ nota, bimestre });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if bimestre is missing", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({ nota, disciplina });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if nota is not a number", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({
        nota: "Oito",
        bimestre,
        disciplina
      });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if nota is invalid", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({
        nota: 10.2,
        bimestre, 
        disciplina
      });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if bismestre is invalid", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({
        nota,
        disciplina,
        bimestre: "Quinto"
      });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if bimestre is not a string", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({
        nota, 
        disciplina,
        bimestre: 4
      });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if disciplina is not a string", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({
        nota, 
        bimestre,
        disciplina: {
          arte: "Arte"
        }
      });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if disciplina is invalid", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({
        nota, 
        bimestre,
        disciplina: "História"
      });

    expect(response.statusCode).toBe(400);
  })

  it("Should return the product on success", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send(BODY);
      
    expect(response.statusCode).toBe(201);
  }) 
})