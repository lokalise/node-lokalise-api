import { BaseCollection } from "./base_collection.js";
import { Comment } from "../models/comment.js";
class Comments extends BaseCollection {
    static rootElementName = "comments";
    static rootElementNameSingular = "comment";
    static prefixURI = "projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";
    static elementClass = Comment;
    list(request_params) {
        return this.doList(request_params);
    }
    create(comment_params, request_params) {
        const body = { comments: this.objToArray(comment_params) };
        return this.doCreate(body, request_params, this.populateArrayFromJson);
    }
    get(comment_id, request_params) {
        return this.doGet(comment_id, request_params);
    }
    delete(comment_id, request_params) {
        return this.doDelete(comment_id, request_params);
    }
    list_project_comments(params) {
        return this.createPromise("GET", params, this.populateArrayFromJson, this.handleReject, null, "projects/{!:project_id}/comments");
    }
}
export { Comments };
//# sourceMappingURL=comments.js.map