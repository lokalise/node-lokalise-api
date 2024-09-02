import { Jwt as JwtInterface } from "../interfaces/jwt.js";
import { BaseModel } from "./base_model.js";
export declare class Jwt extends BaseModel implements JwtInterface {
	jwt: string;
}
