import { BaseCollection } from "./base_collection.js";
import { Jwt as JwtModel } from "../models/jwt.js";

export class Jwt extends BaseCollection {
  protected static prefixURI = "projects/{!:project_id}/tokens";
  protected static elementClass = JwtModel;

  create(project_id: string, body = { service: "ota" }): Promise<JwtModel> {
    // return this.createPromise(
    //   "POST",
    //   {},
    //   this.populateObjectFromJson,
    //   this.handleReject,
    //   null,
    //   Jwt.prefixURI
    // );
    const request_params = { project_id: project_id };
    return this.doCreate(body, request_params, this.populateObjectFromJson);
  }
}
