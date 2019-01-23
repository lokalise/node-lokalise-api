import { ApiRequest } from '../http_client/base';
import { StandartParams } from '../interfaces/standart_params';

export class BaseModel {
  constructor(params: Object) {
    for(let key of Object.keys(params)){
      this[key] = params[key];
    }
    return this;
  }
}
