import { Validated } from "../models";

export interface BodyValidate {
  handle(body: any): Validated;
}
