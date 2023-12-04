import { BaseCollection } from "../collections/base_collection.js";
import { ApiError } from "../models/api_error.js";
import { Keyable } from "../interfaces/keyable.js";

export abstract class OtaCollection extends BaseCollection {
  protected populateApiErrorFromJson(json: any): ApiError {
    return <ApiError>json;
  }

  protected doDelete(id: string | number, req_params: Keyable): Promise<any> {
    const params = {
      ...req_params,
      id,
    };
    return this.createPromise(
      "DELETE",
      params,
      this.returnJSONFromData,
      this.handleReject,
      null,
    );
  }

  protected returnJSONFromData(json: Keyable): Keyable | Array<Keyable> {
    return json["data"];
  }
}
