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
      console.error(error);
    }
  }

  async add(body: Body): Promise<Note | undefined> {
    try {
      return (await api.post("/", { ...body })).data;
    } catch (error) {
      console.error(error);
    }
  }

  async delete(param: QueryParam): Promise<void> {
    const { id } = param;
    try {
      (await api.delete("/" + id)).status;
    } catch (error) {
      console.error(error);
    }
  }
}
