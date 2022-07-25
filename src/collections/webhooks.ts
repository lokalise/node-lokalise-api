import { BaseCollection } from "./base_collection.js";
import { Webhook } from "../models/webhook.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class Webhooks extends BaseCollection {
  protected static rootElementName = "webhooks";
  protected static rootElementNameSingular = "webhook";
  protected static prefixURI = "projects/{!:project_id}/webhooks/{:id}";
  protected static elementClass = Webhook;

  create(body: Keyable, params: StandartParams): Promise<Webhook> {
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
    body: Keyable,
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
