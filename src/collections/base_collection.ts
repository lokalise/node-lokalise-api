import { ApiRequest } from "../http_client/base";
import { StandartParams } from "../interfaces/standart_params";
import { ApiError } from "../models/api_error";

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

  // Workaround for handling HTTP header pagination params

  totalResults: number | null = null;
  totalPages: number | null = null;
  resultsPerPage: number | null = null;
  currentPage: number | null = null;

  get(id: any, params: StandartParams = {}, body: any = null): Promise<any> {
    params["id"] = id;
    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }

  list(params: StandartParams = {}): Promise<any[]> {
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      null
    );
  }

  create(body: any, params: StandartParams = {}): Promise<any> {
    return this.createPromise(
      "POST",
      params,
      this.populateObjectFromJson,
      this.handleReject,
      body
    );
  }

  update(id: any, body: any, params: StandartParams = {}): Promise<any> {
    params["id"] = id;
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJson,
      this.handleReject,
      body
    );
  }

  delete(id: any, params: StandartParams = {}): Promise<any> {
    params["id"] = id;
    return this.createPromise(
      "DELETE",
      params,
      this.returnBareJSON,
      this.handleReject,
      null
    );
  }

  populatePaginationDataFor(headers: any): void {
    this.totalResults = parseInt(headers["x-pagination-total-count"]);
    this.totalPages = parseInt(headers["x-pagination-page-count"]);
    this.resultsPerPage = parseInt(headers["x-pagination-limit"]);
    this.currentPage = parseInt(headers["x-pagination-page"]);
    return;
  }

  protected populateObjectFromJsonRoot(json: any): this {
    const childClass = <typeof BaseCollection>this.constructor;
    if (childClass.rootElementNameSingular != null) {
      json = json[childClass.rootElementNameSingular];
    }
    return this.populateObjectFromJson(json);
  }

  protected populateSecondaryObjectFromJsonRoot(json: any): this {
    const childClass = <typeof BaseCollection>this.constructor;
    if (childClass.secondaryElementNameSingular != null) {
      json = json[childClass.secondaryElementNameSingular];
    }
    return this.populateObjectFromJson(json, true);
  }

  protected populateObjectFromJson(
    json: Object,
    secondary: boolean = false
  ): this {
    const childClass = <typeof BaseCollection>this.constructor;
    if (secondary) {
      return new childClass.secondaryElementClass(json);
    } else {
      return new childClass.elementClass(json);
    }
  }

  protected populateArrayFromJson(json: Array<any>): this[] {
    const childClass = <typeof BaseCollection>this.constructor;
    const arr: this[] = [];
    const jsonArray = json[(<any>childClass).rootElementName];
    for (const obj of jsonArray) {
      arr.push(this.populateObjectFromJson(obj));
    }
    return arr;
  }

  protected populateApiErrorFromJson(json: Object): ApiError {
    return <ApiError>json;
  }

  protected returnBareJSON(json: any): any {
    return json;
  }

  protected handleReject(data: any): ApiError {
    return this.populateApiErrorFromJson(data);
  }

  protected createPromise(
    method: any,
    params: any,
    resolveFn: any,
    rejectFn = this.handleReject,
    body: any = null,
    uri: any = null
  ): Promise<any> {
    const childClass = <typeof BaseCollection>this.constructor;
    if (uri == null) {
      uri = childClass.prefixURI;
    }
    return new Promise((resolve, reject) => {
      const response: ApiRequest = new ApiRequest(uri, method, body, params);
      response.promise
        .then((result) => {
          const headers = result["headers"];
          this.populatePaginationDataFor(headers);
          const json = result["body"];
          resolve(resolveFn.call(this, json));
        })
        .catch((data) => {
          reject(rejectFn.call(this, data));
        });
    });
  }
}
