import { BaseCollection } from "./base_collection";
import { Comment } from "../models/comment";
export class Comments extends BaseCollection {
    create(raw_body, params) {
        const body = { comments: this.objToArray(raw_body) };
        return this.createPromise("POST", params, this.populateArrayFromJson, this.handleReject, body);
    }
    list_project_comments(params) {
        return this.createPromise("GET", { project_id: params["project_id"] }, this.populateArrayFromJson, this.handleReject, null, "projects/{!:project_id}/comments");
    }
}
Comments.rootElementName = "comments";
Comments.rootElementNameSingular = "comment";
Comments.prefixURI = "projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";
Comments.elementClass = Comment;
//# sourceMappingURL=comments.js.map