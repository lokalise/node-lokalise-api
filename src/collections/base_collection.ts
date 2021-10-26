import { Options } from "got";
import { ApiRequest } from "../http_client/base";
import { StandartParams } from "../interfaces/standart_params";
import { ApiError } from "../models/api_error";
import { PaginatedResult } from "../models/paginated_result";
import { Keyable } from "../interfaces/keyable";
import { ClientData } from "../interfaces/client_data";

export class BaseCollection {
  clientData: ClientData;
  protected static rootElementName: string = "";
  protected static rootElementNameSingular: string | null = null;
  protected static endpoint: string | null = null;
  protected static prefixURI: string | null = null;
  protected static elementClass: any = null;

  // Secondaries are used when an instance of a different class has to be created
  // For example, uploading a File may return a QueuedProcess
  protected static secondaryElementNameSingular: string | null = null;
  protected static secondaryElementClass: any = null;

  constructor(clientData: ClientData) {
    this.clientData = clientData;
  }

  get(id: string | number, params: StandartParams = {}): Promise<any> {
    params["id"] = id;
    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      null
    );
  }

  list(params: StandartParams = {}): Promise<any> {
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      null
    );
  }

  create(
    body: object | object[] | null,
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
    body: object | object[] | null,
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

  protected populateObjectFromJsonRoot(json: object, headers: object): any {
    const childClass = <typeof BaseCollection>this.constructor;
    if (childClass.rootElementNameSingular) {
      json = Object(json)[childClass.rootElementNameSingular];
    }
    return this.populateObjectFromJson(json, headers);
  }

  protected populateSecondaryObjectFromJsonRoot(
    json: object,
    headers: object
  ): any {
    const childClass = <typeof BaseCollection>this.constructor;
    json = Object(json)[<string>childClass.secondaryElementNameSingular];
    return this.populateObjectFromJson(json, headers, true);
  }

  protected populateObjectFromJson(
    json: object,
    _headers: object,
    secondary: boolean = false
  ): any {
    const childClass = <typeof BaseCollection>this.constructor;
    if (secondary) {
      return new childClass.secondaryElementClass(json);
    } else {
      return new childClass.elementClass(json);
    }
  }

  protected populateArrayFromJson(
    json: Keyable,
    headers: object
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
        const result: Keyable = {
          errors: json["errors"],
          items: arr,
        };
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
    json: Keyable | Array<Keyable>
  ): Keyable | Array<Keyable> {
    return json;
  }

  protected handleReject(data: any): ApiError {
    return this.populateApiErrorFromJson(data);
  }

  protected createPromise(
    method: Options["method"],
    params: StandartParams,
    resolveFn: Function,
    rejectFn: Function,
    body: object | object[] | null,
    uri: string | null = null
  ): Promise<any> {
    const childClass = <typeof BaseCollection>this.constructor;
    if (!uri) {
      uri = childClass.prefixURI;
    }
    return new Promise((resolve, reject) => {
      const response: ApiRequest = new ApiRequest(
        <string>uri,
        method,
        body,
        params,
        this.clientData
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

  protected objToArray(raw_body: object | object[]): Array<object> {
    if (!Array.isArray(raw_body)) {
      return Array<Object>(raw_body);
    } else {
      return raw_body;
    }
  }
}
