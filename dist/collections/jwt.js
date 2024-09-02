import { Jwt as JwtModel } from "../models/jwt.js";
import { BaseCollection } from "./base_collection.js";
export class Jwt extends BaseCollection {
    static prefixURI = "projects/{!:project_id}/tokens";
    static elementClass = JwtModel;
    create(project_id, body = { service: "ota" }) {
        const request_params = { project_id: project_id };
        return this.doCreate(body, request_params, this.populateObjectFromJson);
    }
}
//# sourceMappingURL=jwt.js.map