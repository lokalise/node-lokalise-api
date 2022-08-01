import { Options } from "got";
import { ApiRequest } from "../http_client/base";
import { ApiError } from "../models/api_error";
import { PaginatedResult } from "../models/paginated_result";
import { Keyable } from "../interfaces/keyable";
import { ClientData } from "../interfaces/client_data";
import { BulkResult } from "../interfaces/bulk_result";

type RejectHandler = (data: any) => ApiError;
type ResolveHandler = (json: Keyable, headers: Keyable, ...args: any[]) => any;

export abstract class BaseCollection {
  readonly clientData: ClientData;
  protected static rootElementName: string;
  protected static rootElementNameSingular: string | null;
  protected static endpoint: string | null;
  protected static prefixURI: string | null;
  protected static elementClass: any;

  // Secondaries are used when an instance of a different class has to be created
  // For example, uploading a File may return a QueuedProcess
  protected static secondaryElementNameSingular: string | null;
  protected static secondaryElementClass: any;

  constructor(clientData: ClientData) {
    this.clientData = clientData;
  }

  protected doList(params: Keyable): Promise<any> {
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      null
    );
  }

  protected doGet(id: string | number, params: Keyable = {}): Promise<any> {
    params["id"] = id;
    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      null
    );
  }

  protected doDelete(id: string | number, params: Keyable = {}): Promise<any> {
    params["id"] = id;
    return this.createPromise(
      "DELETE",
      params,
      this.returnBareJSON,
      this.handleReject,
      null
    );
  }

  protected doCreate(
    body: Keyable | null,
    params: Keyable = {},
    resolveFn = this.populateObjectFromJson
  ): Promise<any> {
    return this.createPromise(
      "POST",
      params,
      resolveFn,
      this.handleReject,
      body
    );
  }

  protected doUpdate(
    id: string | number,
    body: Keyable | null,
    req_params: Keyable,
    resolveFn = this.populateObjectFromJsonRoot
  ): Promise<any> {
    const params = {
      ...req_params,
      ...{ id: id },
    };
    return this.createPromise(
      "PUT",
      params,
      resolveFn,
      this.handleReject,
      body
    );
  }

  protected populateObjectFromJsonRoot(json: Keyable, headers: Keyable): any {
    const childClass = <typeof BaseCollection>this.constructor;
    if (childClass.rootElementNameSingular) {
      json = Object(json)[childClass.rootElementNameSingular];
    }
    return this.populateObjectFromJson(json, headers);
  }

  protected populateSecondaryObjectFromJsonRoot(
    json: Keyable,
    headers: Keyable
  ): any {
    const childClass = <typeof BaseCollection>this.constructor;
    json = Object(json)[<string>childClass.secondaryElementNameSingular];
    return this.populateObjectFromJson(json, headers, true);
  }

  protected populateObjectFromJson(
    json: Keyable,
    _headers: Keyable,
    secondary = false
  ): any {
    const childClass = <typeof BaseCollection>this.constructor;

    if (secondary) {
      return new childClass.secondaryElementClass(json);
    } else {
      return new childClass.elementClass(json);
    }
  }

  protected populateArrayFromJsonBulk(
    json: Keyable,
    headers: Keyable
  ): BulkResult | this[] {
    const childClass = <typeof BaseCollection>this.constructor;
    const arr: this[] = [];
    const jsonArray = json[(<any>childClass).rootElementName];
    for (const obj of jsonArray) {
      arr.push(<this>this.populateObjectFromJson(obj, headers));
    }
    const result: BulkResult = {
      errors: json["errors"],
      items: arr,
    };
    return result;
  }

  protected populateArrayFromJson(
    json: Keyable,
    headers: Keyable
  ): PaginatedResult | Keyable | this[] {
    const childClass = <typeof BaseCollection>this.constructor;
    const arr: this[] = [];
    const jsonArray = json[(<any>childClass).rootElementName];
    for (const obj of jsonArray) {
      arr.push(<this>this.populateObjectFromJson(obj, headers));
    }

    if (headers["x-pagination-total-count"] && headers["x-pagination-page"]) {
      const result: PaginatedResult = new PaginatedResult(arr, headers);
      return result;
    } else {
      return arr;
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

  protected async createPromise(
    method: Options["method"],
    params: Keyable,
    resolveFn: ResolveHandler,
    rejectFn: RejectHandler,
    body: object | object[] | null,
    uri: string | null = null
  ): Promise<any> {
    const childClass = <typeof BaseCollection>this.constructor;
    if (!uri) {
      uri = childClass.prefixURI;
    }
    const request: ApiRequest = new ApiRequest(
      <string>uri,
      method,
      body,
      params,
      this.clientData
    );
    try {
      const data = await request.promise;
      return Promise.resolve(
        resolveFn.call(this, data["json"], data["headers"])
      );
    } catch (err) {
      return Promise.reject(rejectFn.call(this, err));
    }
  }

  protected objToArray(raw_body: Keyable | Keyable[]): Array<Keyable> {
    if (!Array.isArray(raw_body)) {
      return Array(raw_body);
    } else {
      return raw_body;
    }
  }
}
