import { ApiRequest } from '../http_client/base';
import { StandartParams } from '../interfaces/standart_params';

export class BaseCollection {
  protected static rootElementName: string = null;
  protected static endpoint: string = null;
  protected static prefixURI: string = null;
  protected static elementClass: any = null;

  get(id, params: StandartParams = {}, body: any = null) : Promise<any> {
    return this.createPromise('GET', {id: id}, this.populateObjectFromJson, this.handleReject, body)
  }

  list(params : StandartParams ={}): Promise<any[]> {
    return this.createPromise('GET', params, this.populateArrayFromJson, this.handleReject, null);
  }

  create(body, params: StandartParams = {}): Promise<any> {
    return this.createPromise('POST', params, this.populateObjectFromJson, this.handleReject, body);
  }

  update(body, params : StandartParams = {}) : Promise<any> {
    return this.createPromise('PUT', params, this.populateObjectFromJson, this.handleReject, body);
  }

  delete(id, params : StandartParams = {}) {
    return this.createPromise('DELETE', {id: id}, this.populateObjectFromJson, this.handleReject, null);
  }

  protected populateObjectFromJson(json: Object): this {
    let childClass = <typeof BaseCollection>this.constructor;
    return new childClass.elementClass(json);
  }

  protected populateArrayFromJson(json: Array<any>): this[] {
    let childClass = <typeof BaseCollection>this.constructor;
    let arr: this[] = new Array();
    let jsonArray = json[childClass.rootElementName];
    for (let obj of jsonArray) {
      arr.push(this.populateObjectFromJson(obj));
    }
    return arr;
  }

  protected returnBareJSON(json: any) : any {
    return json;
  }

  protected handleReject(data) {
    return data;
  }

  protected createPromise(method, params, resolveFn, rejectFn = this.handleReject, body = null, uri = null) : Promise<any> {
    let childClass = <typeof BaseCollection>this.constructor;
    if (uri == null) {
      uri = childClass.prefixURI;
    }
    return new Promise((resolve, reject) => {
      let response: ApiRequest = new ApiRequest(uri, method, body, params);
      response.promise.then((result) => {
        resolve(resolveFn.call(this, result));
      }).then((data) => {
        reject(rejectFn.call(this, data));
      });
    });
  }

}