import request = require('request');
import { LokaliseApi } from '../lokalise/lokalise';

export class ApiRequest {

  private urlRoot:string = 'https://api.lokalise.co/api2/'
  public promise: Promise<Object>;
  public params: any = {};
  public qs: any = {}


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
      this.composeQueryString();
      options['qs'] = this.qs;
      options['body'] = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          console.log(error);
          reject(error)
        } else {
          console.log(JSON.parse(body));
          resolve(JSON.parse(body));
        }
      });
    });
  }

  protected composeQueryString() {
     if (this.params['page']) {
       this.qs['page'] = this.params['page'];
       delete this.params['page'];
     }
     if (this.params['limit']) {
       this.qs['limit'] = this.params['limit'];
       delete this.params['page'];
     }
  }

  protected composeURI(uri) {
    let regexp: RegExp =/{(\!{0,1}):(\w*)\}/g;
    let matches =  uri.replace(regexp, this.mapUriParams(this.params));
    console.log(matches);
    return matches;
  }

  protected mapUriParams(params) {
    console.log(params);
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
