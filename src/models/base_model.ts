export class BaseModel {
  constructor(params: any) {
    for (const key of Object.keys(params)) {
      (<any>this)[key] = params[key];
    }
  }
}
