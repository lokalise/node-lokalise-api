import type { Jwt as JwtInterface } from "../interfaces/jwt.js";
import { BaseModel } from "./base_model.js";

export class Jwt extends BaseModel implements JwtInterface {
	declare jwt: string;
}
