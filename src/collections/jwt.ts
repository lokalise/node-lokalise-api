import { BaseCollection } from "./base_collection.js";
import { Jwt as JwtModel } from "../models/jwt.js";

export class Jwt extends BaseCollection {
  protected static prefixURI = "jwt-tokens/ota";
  protected static elementClass = JwtModel;

  get(): Promise<JwtModel> {
    return this.createPromise(
      "GET",
      {},
      this.populateObjectFromJson,
      this.handleReject,
      null,
      Jwt.prefixURI
    );
  }
}
