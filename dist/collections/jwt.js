import { BaseCollection } from "./base_collection.js";
import { Jwt as JwtModel } from "../models/jwt.js";
export class Jwt extends BaseCollection {
    static prefixURI = "jwt-tokens/ota";
    static elementClass = JwtModel;
    get() {
        return this.createPromise("GET", {}, this.populateObjectFromJson, this.handleReject, null, Jwt.prefixURI);
    }
}
//# sourceMappingURL=jwt.js.map