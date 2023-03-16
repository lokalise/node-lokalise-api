import { BaseCollection } from "./base_collection.js";
import { Jwt as JwtModel } from "../models/jwt.js";
class Jwt extends BaseCollection {
    static prefixURI = "projects/{!:project_id}/tokens";
    static elementClass = JwtModel;
    create(project_id, body = { service: "ota" }) {
        // return this.createPromise(
        //   "POST",
        //   {},
        //   this.populateObjectFromJson,
        //   this.handleReject,
        //   null,
        //   Jwt.prefixURI
        // );
        const request_params = { project_id: project_id };
        return this.doCreate(body, request_params, this.populateObjectFromJson);
    }
}
export { Jwt };
//# sourceMappingURL=jwt.js.map