import {ApiRequest} from '../http_client/base';

export class BaseModel {
  protected static rootElementName: string = null;
  protected static endpoint: string = null;
  protected static prefixURI: string = null;

  get(id) : Promise<this> {
    return this.createPromise('GET', {id: id}, this.populateObjectFromJson, this.handleReject, null)
  }

  list(params={}): Promise<this[]> {
    return this.createPromise('GET', params, this.populateArrayFromJson, this.handleReject, null);
  }

  create(body, params = {}): Promise<this> {
    return this.createPromise('POST', params, this.populateObjectFromJson, this.handleReject, body);
  }

  update(body, params = {}) : Promise<this> {
    return this.createPromise('PUT', params, this.populateObjectFromJson, this.handleReject, body);
  }

  delete(id, params = {}) {
    return this.createPromise('DELETE', {id: id}, this.populateObjectFromJson, this.handleReject, null);
  }

  protected populateObjectFromJson(json: Object): this {
    for (let key in json) {
      this[key] = json[key];
    }
    return this;
  }

  protected populateArrayFromJson(json: Array<any>): this[] {
    let arr: this[] = new Array();
    for (let obj of json) {
      arr.push(this.populateObjectFromJson(obj));
    }
    return arr;
  }

  protected handleReject(data) {
    return data;
  }

  protected createPromise(method, params, resolveFn, rejectFn = this.handleReject, body = null, uri = null) : Promise<any> {
    let childClass = <typeof BaseModel>this.constructor;
    if (uri == null) {
      uri = childClass.prefixURI;
    }
    return new Promise((resolve, reject) => {
      let response: ApiRequest = new ApiRequest(uri, method, body, params);
      response.promise.then((result) => {
        resolve(resolveFn.call(result));
      }).then((data) => {
        reject(rejectFn.call(data));
      });
    });
  }
}