import { Options } from "got";
import { ApiRequest } from "./base.js";
export declare class OtaRequest extends ApiRequest {
    protected readonly urlRoot: NonNullable<Options["prefixUrl"]>;
}
