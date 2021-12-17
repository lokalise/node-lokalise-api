import { Segment as SegmentModel } from "../models/segment";
import { BaseCollection } from "./base_collection";
import { StandartParams } from "../interfaces/standart_params";

export class Segments extends BaseCollection {
  protected static rootElementName: string = "segments";
  protected static rootElementNameSingular: string = "segment";
  protected static prefixURI: string =
    "projects/{!:project_id}/keys/{!:key_id}/segments/{!:language_iso}/{:id}";
  protected static elementClass: object = SegmentModel;

  update(
    id: string | number,
    body: object | object[] | null,
    params: StandartParams = {}
  ): Promise<any> {
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
