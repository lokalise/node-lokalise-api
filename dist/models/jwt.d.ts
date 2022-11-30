import { BaseModel } from "./base_model.js";
import { Jwt as JwtInterface } from "../interfaces/jwt.js";
export declare class Jwt extends BaseModel implements JwtInterface {
    jwt: string;
}
