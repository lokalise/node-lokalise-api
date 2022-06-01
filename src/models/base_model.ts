export abstract class BaseModel {
  constructor(params: { [key: string]: any }) {
    for (const key of Object.keys(params)) {
      (<any>this)[key] = params[key];
    }
  }
}
