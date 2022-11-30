import { BaseModel } from "./base_model.js";
import { Jwt as JwtInterface } from "../interfaces/jwt.js";

export class Jwt extends BaseModel implements JwtInterface {
  declare jwt: string;
}
