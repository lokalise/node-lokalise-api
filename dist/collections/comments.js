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
    create(raw_body, params) {
        const body = { comments: this.objToArray(raw_body) };
        return this.createPromise("POST", params, this.populateArrayFromJson, this.handleReject, body);
    }
    list_project_comments(params) {
        return this.createPromise("GET", { project_id: params["project_id"] }, this.populateArrayFromJson, this.handleReject, null, "projects/{!:project_id}/comments");
    }
}
exports.Comments = Comments;
//# sourceMappingURL=comments.js.map