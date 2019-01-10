import {ApiRequest} from '../http_client/base';

export class BaseModel {
  protected static rootElementName: string = 'default';
  protected static endpoint: string = ''

  get(id) {
    let childClass = <typeof BaseModel>this.constructor;
    let endpoint: string = childClass.endpoint;
    let uri: string = endpoint + '/' + id;
    return new Promise((resolve, reject) => {
      let response: ApiRequest = new ApiRequest(uri, 'GET');
      response.promise.then((result) => {
        resolve(this.populateObjectFromJson(result));
      }).then((data) => {
        reject(data);
      });
    });
  }

  list(): Promise<this[]> {
    return new Promise((resolve, reject) => {
      let childClass = <typeof BaseModel>this.constructor;
      let rootElementName: string = childClass.rootElementName;
      let endpoint: string  = childClass.endpoint;
      let uri = endpoint;
      let response: ApiRequest = new ApiRequest(uri, 'GET');
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

  create(params) {
    let childClass = <typeof BaseModel>this.constructor;
    let endpoint: string = childClass.endpoint;
    let uri: string = endpoint;
    return new Promise((resolve, reject) => {
      let response: ApiRequest = new ApiRequest(uri, 'POST', params);
      response.promise.then((result) => {
        resolve(this.populateObjectFromJson(result));
      }).then((data) => {
        reject(data);
      });
    });
  }

   create(params) {
    let childClass = <typeof BaseModel>this.constructor;
    let endpoint: string = childClass.endpoint;
    let uri: string = endpoint;
    return new Promise((resolve, reject) => {
      let response: ApiRequest = new ApiRequest(uri, 'POST', params);
      response.promise.then((result) => {
        resolve(this.populateObjectFromJson(result));
      }).then((data) => {
        reject(data);
      });
    });
  }

  update(params) {
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