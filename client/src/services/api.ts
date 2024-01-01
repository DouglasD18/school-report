import axios from "axios";

import { Body, Note, QueryParam } from "@/types";

const api = axios.create({
  baseURL: "http://localhost:8080/api/note"
});

export class Api {
  async list(): Promise<Note[] | undefined> {
    try {
      return (await api.get("/")).data;
    } catch (error) {
      console.log(error);
    }
  }

  async add(body: Body): Promise<Note | undefined> {
    try {
      return (await api.post("/", { body })).data;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(param: QueryParam): Promise<boolean | undefined> {
    const { id } = param;
    try {
      const header = (await api.delete("/" + id)).status;
      return header === 204 ? true : false;
    } catch (error) {
      console.log(error);
    }
  }
}
