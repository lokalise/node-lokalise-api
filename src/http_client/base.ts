import request = require('request');
import { LokaliseApi } from '../lokalise/lokalise';

export class ApiRequest {

  private urlRoot:string = 'https://api.lokalise.co/api2/'
  public promise: Promise<Object>;

  constructor(uri, method, params={}) {
    this.promise = this.createPromise(uri, method, params)
    return this;
  }

  createPromise(uri, method, params) {
    let options = { 
      url: this.urlRoot + uri, 
      method: method,
      headers: { 'x-api-token': LokaliseApi.apiKey, 'content-type': 'application/json' }
    };

    if (Object.keys(params).length > 0) {
      options['body'] = JSON.stringify(params);
    }

    console.log(options);

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          console.log(error);
          reject(error)
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }

  constructParameters(method, params) {}
}
