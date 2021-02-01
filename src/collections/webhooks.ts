import { BaseCollection } from "./base_collection";
import { Webhook } from "../models/webhook";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";

export class Webhooks extends BaseCollection {
  protected static rootElementName: string = "webhooks";
  protected static rootElementNameSingular: string = "webhook";
  protected static prefixURI: string = "projects/{!:project_id}/webhooks/{:id}";
  protected static elementClass: object = Webhook;

  create(body: object, params: StandartParams): Promise<Webhook> {
    return this.createPromise(
      "POST",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }

  update(
    id: string | number,
    body: object,
    params: StandartParams
  ): Promise<Webhook> {
    params["id"] = id;
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }

  regenerate_secret(
    id: string | number,
    params: StandartParams
  ): Promise<Keyable> {
    params["id"] = id;
    return this.createPromise(
      "PATCH",
      params,
      this.returnBareJSON,
      this.handleReject,
      null,
      "projects/{!:project_id}/webhooks/{:id}/secret/regenerate"
    );
  }
}
