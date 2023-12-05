import { BaseCollection } from "../collections/base_collection.js";
import { ApiError } from "../models/api_error.js";
import { Keyable } from "../interfaces/keyable.js";
export declare abstract class OtaCollection extends BaseCollection {
    protected populateApiErrorFromJson(json: any): ApiError;
    protected doDelete(id: string | number, req_params: Keyable): Promise<any>;
    protected returnJSONFromData(json: Keyable): Keyable | Array<Keyable>;
}
