import { ApiRequest } from "../http_client/base";
import { StandartParams } from "../interfaces/standart_params";
import { ApiError } from "../models/api_error";
import { PaginatedResult } from "../models/paginated_result";
import { Keyable } from "../interfaces/keyable";

export class BaseCollection {
  protected static rootElementName: string = "";
  protected static rootElementNameSingular: string | null = null;
  protected static endpoint: string | null = null;
  protected static prefixURI: string | null = null;
  protected static elementClass: any = null;

  // Secondaries are used when an instance of a different class has to be created
  // For example, uploading a File may return a QueuedProcess
  protected static secondaryElementNameSingular: string | null = null;
  protected static secondaryElementClass: any = null;

  get(
    id: string | number,
    params: StandartParams = {},
    _body: any = null
  ): Promise<any> {
    params["id"] = id;
    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      _body
    );
  }

  list(params: StandartParams = {}): Promise<PaginatedResult> {
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      null
    );
  }

  create(
    body: Object | Array<Object> | null,
    params: StandartParams = {}
  ): Promise<any> {
    return this.createPromise(
      "POST",
      params,
      this.populateObjectFromJson,
      this.handleReject,
      body
    );
  }

  update(
    id: string | number,
    body: Object | Array<Object> | null,
    params: StandartParams = {}
  ): Promise<any> {
    params["id"] = id;
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJson,
      this.handleReject,
      body
    );
  }

  delete(id: string | number, params: StandartParams = {}): Promise<Keyable> {
    params["id"] = id;
    return this.createPromise(
      "DELETE",
      params,
      this.returnBareJSON,
      this.handleReject,
      null
    );
  }

  protected populateObjectFromJsonRoot(json: Object, headers: Object): Object {
    const childClass = <typeof BaseCollection>this.constructor;
    if (childClass.rootElementNameSingular) {
      json = Object(json)[childClass.rootElementNameSingular];
    }
    return this.populateObjectFromJson(json, headers);
  }

  protected populateSecondaryObjectFromJsonRoot(
    json: Object,
    headers: Object
  ): Object {
    const childClass = <typeof BaseCollection>this.constructor;
    /* istanbul ignore next */
    if (childClass.secondaryElementNameSingular) {
      json = Object(json)[childClass.secondaryElementNameSingular];
    }
    return this.populateObjectFromJson(json, headers, true);
  }

  protected populateObjectFromJson(
    json: Object,
    _headers: Object,
    secondary: boolean = false
  ): Object {
    const childClass = <typeof BaseCollection>this.constructor;
    if (secondary) {
      return new childClass.secondaryElementClass(json);
    } else {
      return new childClass.elementClass(json);
    }
  }

  protected populateArrayFromJson(
    json: Keyable,
    headers: Object
  ): PaginatedResult | Keyable | this[] {
    const childClass = <typeof BaseCollection>this.constructor;
    const arr: this[] = [];
    const jsonArray = json[(<any>childClass).rootElementName];
    for (const obj of jsonArray) {
      arr.push(<this>this.populateObjectFromJson(obj, headers));
    }

    if (
      Object(headers)["x-pagination-total-count"] &&
      Object(headers)["x-pagination-page"]
    ) {
      const result: PaginatedResult = new PaginatedResult(arr, headers);
      return result;
    } else {
      // Handle rare cases when the response is success but there were errors along with other data
      // Currently, it can only happen when creating or updating items in bulk
      if (json["errors"]) {
        const result: Keyable = {};
        result.errors = json["errors"];
        result.items = arr;
        return result;
      } else {
        return arr;
      }
    }
  }

  protected populateApiErrorFromJson(json: any): ApiError {
    return <ApiError>json;
  }

  protected returnBareJSON(
    json: Object | Array<Object>
  ): Object | Array<Object> {
    return json;
  }

  protected handleReject(data: any): ApiError {
    return this.populateApiErrorFromJson(data);
  }

  /* istanbul ignore next */
  protected createPromise(
    method: string,
    params: Object,
    resolveFn: Function,
    rejectFn: Function = this.handleReject,
    body: Object | Array<Object> | null = null,
    uri: string | null = null
  ): Promise<any> {
    const childClass = <typeof BaseCollection>this.constructor;
    if (uri == null) {
      uri = childClass.prefixURI;
    }
    return new Promise((resolve, reject) => {
      const response: ApiRequest = new ApiRequest(
        <string>uri,
        method,
        body,
        params
      );
      response.promise
        .then((data) => {
          resolve(resolveFn.call(this, data["json"], data["headers"]));
        })
        .catch((data) => {
          reject(rejectFn.call(this, data));
        });
    });
  }

  protected objToArray(raw_body: Object | Object[]): Array<Object> {
    if (!Array.isArray(raw_body)) {
      return Array<Object>(raw_body);
    } else {
      return raw_body;
    }
  }
}
