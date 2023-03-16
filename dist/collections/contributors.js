import { BaseCollection } from "./base_collection.js";
import { Contributor } from "../models/contributor.js";
class Contributors extends BaseCollection {
    static rootElementName = "contributors";
    static rootElementNameSingular = "contributor";
    static prefixURI = "projects/{!:project_id}/contributors/{:id}";
    static elementClass = Contributor;
    list(request_params) {
        return this.doList(request_params);
    }
    create(contributor_params, request_params) {
        const body = { contributors: this.objToArray(contributor_params) };
        return this.doCreate(body, request_params, this.populateArrayFromJson);
    }
    get(contributor_id, request_params) {
        return this.doGet(contributor_id, request_params);
    }
    update(contributor_id, contributor_params, request_params) {
        return this.doUpdate(contributor_id, contributor_params, request_params);
    }
    delete(contributor_id, request_params) {
        return this.doDelete(contributor_id, request_params);
    }
}
export { Contributors };
//# sourceMappingURL=contributors.js.map