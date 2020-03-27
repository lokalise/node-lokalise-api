import { GotRequestMethod, GotError, Response, Options } from 'got';
const got = require('got');
import { LokaliseApi } from '../lokalise/lokalise';

export class ApiRequest {
  private urlRoot: string = 'https://api.lokalise.com/api2/';
  public promise: Promise<any>;
  public params: any = {};

  constructor(uri: any, method: any, body: any = null, params: any = {}) {
    this.params = params;
    this.promise = this.createPromise(uri, method, body);
    return this;
  }

  createPromise(uri: any, method: any, body: any) {
    let options: Options = {
      method: method,
      headers: {'x-api-token': <string>LokaliseApi.apiKey},
      responseType: 'json',
      agent: false
    };

    if (Object.keys(this.params).length > 0) {
      options['searchParams'] = (new URLSearchParams(this.params)).toString();
    }

    if (body) {
      options['body'] = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
      got(this.urlRoot + this.composeURI(uri), options).then((response: Response) => {
          let responseJSON = JSON.parse(<string>response.body);
          if (responseJSON['error'] || (responseJSON['errors'] && responseJSON['errors'].length != 0)) {
            reject(responseJSON['error'] || responseJSON['errors'] || responseJSON);
            return;
          }
          // Workaround to pass header parameters
          let result: any = {};
          result['headers'] = response.headers;
          result['body'] = responseJSON;
          resolve(result);
          return;
      }).then((error:GotError) => {
          reject(error);
          return;
      }).catch((error:any) => {
         reject(error);
         return
      });
    });
  }

  protected composeURI(uri: any) {
    let regexp: RegExp = /{(!{0,1}):(\w*)}/g;
    return uri.replace(regexp, this.mapUriParams(this.params));
  }

  protected mapUriParams(params: any) {
    return (entity: any, isMandaratory: any, paramName: any) => {
      if (params[paramName] != null) {
        let t_param = params[paramName];
        delete this.params[paramName];
        return t_param;
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

  constructParameters(method: any, params: any) {}
}
