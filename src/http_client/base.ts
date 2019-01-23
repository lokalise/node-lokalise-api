import request = require('request');
import { LokaliseApi } from '../lokalise/lokalise';

export class ApiRequest {

  private urlRoot:string = 'https://api.lokalise.co/api2/'
  public promise: Promise<Object>;
  public params: any = {};


  constructor(uri, method, body = null, params={}) {
    this.params = params;
    this.promise = this.createPromise(uri, method, body)
    return this;
  }

  createPromise(uri, method, body) {
    let options = {
      url: this.urlRoot + this.composeURI(uri),
      method: method,
      headers: { 'x-api-token': LokaliseApi.apiKey, 'content-type': 'application/json' }
    };

    if (Object.keys(this.params).length > 0) {
    //   this.composeQueryString();
    options['qs'] = this.params;
    }

    if (body) {
      options['body'] = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }

  protected composeURI(uri) {
    let regexp: RegExp =/{(\!{0,1}):(\w*)\}/g;
    let matches =  uri.replace(regexp, this.mapUriParams(this.params));
    return matches;
  }

  protected mapUriParams(params) {
    return (entity, isMandaratory, paramName) => {
      if (params[paramName] != null) {
        return params[paramName];
      } else {
        if (isMandaratory == '!') {
          throw new Error('Required param ' + paramName);
        }
        else {
          return '';
        }
      }
    }
  }

  constructParameters(method, params) {}
}
