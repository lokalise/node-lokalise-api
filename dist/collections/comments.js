"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const base_collection_1 = require("./base_collection");
const comment_1 = require("../models/comment");
class Comments extends base_collection_1.BaseCollection {
    static rootElementName = "comments";
    static rootElementNameSingular = "comment";
    static prefixURI = "projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";
    static elementClass = comment_1.Comment;
    list(request_params) {
        return super.doList(request_params);
    }
    create(comment_params, request_params) {
        const body = { comments: this.objToArray(comment_params) };
        return this.createPromise("POST", request_params, this.populateArrayFromJson, this.handleReject, body);
    }
    get(comment_id, request_params) {
        return super.doGet(comment_id, request_params);
    }
    delete(comment_id, request_params) {
        return super.doDelete(comment_id, request_params);
    }
    list_project_comments(params) {
        return this.createPromise("GET", params, this.populateArrayFromJson, this.handleReject, null, "projects/{!:project_id}/comments");
    }
}
exports.Comments = Comments;
//# sourceMappingURL=comments.js.map