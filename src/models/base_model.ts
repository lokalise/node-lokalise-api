import {ApiRequest} from '../http_client/base';

export class BaseModel {
  protected static rootElementName: string = null;
  protected static endpoint: string = null;
  protected static prefixURI: string = null;

  get(id) {
    let childClass = <typeof BaseModel>this.constructor;
    let endpoint: string = childClass.endpoint;
    return new Promise((resolve, reject) => {
      let response: ApiRequest = new ApiRequest(childClass.prefixURI, 'GET', null, { id: id });
      response.promise.then((result) => {
        resolve(this.populateObjectFromJson(result));
      }).then((data) => {
        reject(data);
      });
    });
  }

  list(params={}): Promise<this[]> {
    return new Promise((resolve, reject) => {
      let childClass = <typeof BaseModel>this.constructor;
      let rootElementName: string = childClass.rootElementName;
      let response: ApiRequest = new ApiRequest(childClass.prefixURI, 'GET', null, params);
      response.promise.then((result: Object) => {
        if (result[rootElementName]) {
          resolve(this.populateArrayFromJson(result[rootElementName]));
        } else {
          reject('Server returned incorrect format');
        }
      }).then((data: any) => {
        reject(data);
      });
    });
  }

  create(body, params) {
    let childClass = <typeof BaseModel>this.constructor;
    let endpoint: string = childClass.endpoint;
    let uri: string = endpoint;
    return new Promise((resolve, reject) => {
      let response: ApiRequest = new ApiRequest(childClass, 'POST', body, params);
      response.promise.then((result) => {
        resolve(this.populateObjectFromJson(result));
      }).then((data) => {
        reject(data);
      });
    });
  }

  update(body, params) {
    let childClass = <typeof BaseModel>this.constructor;
    let endpoint: string = childClass.endpoint;
    let uri: string = endpoint;
    return new Promise((resolve, reject) => {
      let response: ApiRequest = new ApiRequest(uri, 'PUT', params);
      response.promise.then((result) => {
        resolve(this.populateObjectFromJson(result));
      }).then((data) => {
        reject(data);
      });
    });
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
}