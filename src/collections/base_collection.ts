import { ApiRequest } from '../http_client/base';
import { StandartParams } from '../interfaces/standart_params';

export class BaseCollection {
  protected static rootElementName: string = '';
  protected static rootElementNameSingular: string | null = null;
  protected static endpoint: string | null = null;
  protected static prefixURI: string | null = null;
  protected static elementClass: any = null;

  get(id: any, params: StandartParams = {}, body: any = null) : Promise<any> {
    params['id'] = id;
    return this.createPromise('GET', params, this.populateObjectFromJsonRoot, this.handleReject, body)
  }

  list(params: StandartParams = {}): Promise<any[]> {
    return this.createPromise('GET', params, this.populateArrayFromJson, this.handleReject, null);
  }

  create(body: any, params: StandartParams = {}): Promise<any> {
    return this.createPromise('POST', params, this.populateObjectFromJson, this.handleReject, body);
  }

  update(id: any, body: any, params: StandartParams = {}) : Promise<any> {
    params['id'] = id;
    return this.createPromise('PUT', params, this.populateObjectFromJson, this.handleReject, body);
  }

  delete(id: any, params: StandartParams = {}) {
    params['id'] = id;
    return this.createPromise('DELETE', params, this.returnBareJSON, this.handleReject, null);
  }

  protected populateObjectFromJsonRoot(json: any): this {
    let childClass = <typeof BaseCollection>this.constructor;
    if (childClass.rootElementNameSingular != null) {
      json = json[childClass.rootElementNameSingular];
    }
    return this.populateObjectFromJson(json);
  }

  protected populateObjectFromJson(json: Object): this {
    let childClass = <typeof BaseCollection>this.constructor;
    return new childClass.elementClass(json);
  }

  protected populateArrayFromJson(json: Array<any>): this[] {
    let childClass = <typeof BaseCollection>this.constructor;
    let arr: this[] = [];
    let jsonArray = json[(childClass as any).rootElementName];
    for (let obj of jsonArray) {
      arr.push(this.populateObjectFromJson(obj));
    }
    return arr;
  }

  protected returnBareJSON(json: any) : any {
    return json;
  }

  protected handleReject(data: any) {
    console.log(data);
    return;
  }

  protected createPromise(method: any, params: any, resolveFn: any, rejectFn = this.handleReject, body: any = null, uri: any = null) : Promise<any> {
    let childClass = <typeof BaseCollection>this.constructor;
    if (uri == null) {
      uri = childClass.prefixURI;
    }
    return new Promise((resolve, reject) => {
      let response: ApiRequest = new ApiRequest(uri, method, body, params);
      response.promise.then((result) => {
        resolve(resolveFn.call(this, result));
      }).catch((data) => {
        reject(rejectFn.call(this, data));
      });
    });
  }
}
