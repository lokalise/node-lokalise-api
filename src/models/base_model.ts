import { ApiRequest } from '../http_client/base';
import { StandartParams } from '../interfaces/standart_params';

export class BaseModel {
  constructor(params: any) {
    for(let key of Object.keys(params)){
      (this as any)[key] = params[key];
    }
    return this;
  }
}
