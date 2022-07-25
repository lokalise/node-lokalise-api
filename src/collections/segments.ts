import { Segment as SegmentModel } from "../models/segment.js";
import { BaseCollection } from "./base_collection.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class Segments extends BaseCollection {
  protected static rootElementName = "segments";
  protected static rootElementNameSingular = "segment";
  protected static prefixURI =
    "projects/{!:project_id}/keys/{!:key_id}/segments/{!:language_iso}/{:id}";
  protected static elementClass = SegmentModel;

  update(
    id: string | number,
    body: Keyable | Keyable[] | null,
    params: StandartParams = {}
  ): Promise<SegmentModel> {
    params["id"] = id;
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }
}
