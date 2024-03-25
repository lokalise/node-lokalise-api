import type { HttpMethod } from "../types/http_method.js";
import { ApiRequest } from "../http_client/base.js";
import { ApiError } from "../models/api_error.js";
import { PaginatedResult } from "../models/paginated_result.js";
import { Keyable } from "../interfaces/keyable.js";
import { ClientData } from "../interfaces/client_data.js";
import { BulkResult } from "../interfaces/bulk_result.js";

type RejectHandler = (data: any) => ApiError;
type ResolveHandler = (json: Keyable, headers: Headers, ...args: any[]) => any;

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

  protected doList(req_params: Keyable): Promise<any> {
    const params = {
      ...req_params,
    };
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      null,
    );
  }

  protected doGet(id: string | number, req_params: Keyable = {}): Promise<any> {
    const params = {
      ...req_params,
      id,
    };
    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      null,
    );
  }

  protected doDelete(
    id: string | number,
    req_params: Keyable = {},
  ): Promise<any> {
    const params = {
      ...req_params,
      id,
    };
    return this.createPromise(
      "DELETE",
      params,
      this.returnBareJSON,
      this.handleReject,
      null,
    );
  }

  protected doCreate(
    body: Keyable | null,
    req_params: Keyable = {},
    resolveFn = this.populateObjectFromJson,
  ): Promise<any> {
    const params = {
      ...req_params,
    };

    return this.createPromise(
      "POST",
      params,
      resolveFn,
      this.handleReject,
      body,
    );
  }

  protected doUpdate(
    id: string | number,
    body: Keyable | null,
    req_params: Keyable,
    resolveFn = this.populateObjectFromJsonRoot,
    method: HttpMethod = "PUT",
  ): Promise<any> {
    const params = {
      ...req_params,
      id,
    };
    return this.createPromise(
      method,
      params,
      resolveFn,
      this.handleReject,
      body,
    );
  }

  protected populateObjectFromJsonRoot(json: Keyable, headers: Headers): any {
    const childClass = <typeof BaseCollection>this.constructor;
    if (childClass.rootElementNameSingular) {
      json = Object(json)[childClass.rootElementNameSingular];
    }
    return this.populateObjectFromJson(json, headers);
  }

  protected populateSecondaryObjectFromJsonRoot(
    json: Keyable,
    headers: Headers,
  ): any {
    const childClass = <typeof BaseCollection>this.constructor;
    json = Object(json)[<string>childClass.secondaryElementNameSingular];
    return this.populateObjectFromJson(json, headers, true);
  }

  protected populateObjectFromJson(
    json: Keyable,
    _headers: Headers,
    secondary = false,
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
    headers: Headers,
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
    headers: Headers,
  ): PaginatedResult | Keyable | this[] {
    const childClass = <typeof BaseCollection>this.constructor;
    const arr: this[] = [];
    const jsonArray = json[(<any>childClass).rootElementName];

    for (const obj of jsonArray) {
      arr.push(<this>this.populateObjectFromJson(obj, headers));
    }

    if (
      headers.get("x-pagination-total-count") &&
      headers.get("x-pagination-page")
    ) {
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
    json: Keyable | Array<Keyable>,
  ): Keyable | Array<Keyable> {
    return json;
  }

  protected handleReject(data: any): ApiError {
    return this.populateApiErrorFromJson(data);
  }

  protected async createPromise(
    method: HttpMethod,
    params: Keyable,
    resolveFn: ResolveHandler | null,
    rejectFn: RejectHandler,
    body: object | object[] | null,
    uri: string | null = null,
  ): Promise<any> {
    const request = this.prepareRequest(method, body, params, uri);

    try {
      const data = await request.promise;
      let result = null;

      if (resolveFn !== null) {
        result = resolveFn.call(this, data["json"], data["headers"]);
      }

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(rejectFn.call(this, err));
    }
  }

  protected prepareRequest(
    method: HttpMethod,
    body: object | object[] | null,
    params: Keyable,
    uri: string | null,
  ): ApiRequest {
    return new ApiRequest(
      this.getUri(uri),
      method,
      body,
      params,
      this.clientData,
    );
  }

  protected getUri(uri: string | null): string {
    const childClass = <typeof BaseCollection>this.constructor;
    if (!uri) {
      uri = childClass.prefixURI;
    }

    return <string>uri;
  }

  protected objToArray(raw_body: Keyable | Keyable[]): Array<Keyable> {
    if (!Array.isArray(raw_body)) {
      return Array(raw_body);
    } else {
      return raw_body;
    }
  }
}
