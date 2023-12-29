import { MongoHelper as sut } from "./mongo-helper"

describe("MongoHelper", () => {
  afterAll(async () => {
    await sut.disconnect();
  })

  it("Should reconnect if mongodb down", async () => {
    let noteCollection = await sut.getCollection("notes");
    expect(noteCollection).toBeTruthy();
    await sut.disconnect();
    noteCollection = await sut.getCollection("notes");
    expect(noteCollection).toBeTruthy();
  })
})
