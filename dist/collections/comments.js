"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const base_collection_1 = require("./base_collection");
const comment_1 = require("../models/comment");
class Comments extends base_collection_1.BaseCollection {
    create(body, params) {
        return this.createPromise("POST", params, this.populateArrayFromJson, this.handleReject, body);
    }
    list_project_comments(params) {
        return this.createPromise("GET", { project_id: params["project_id"] }, this.populateArrayFromJson, this.handleReject, null, "projects/{!:project_id}/comments");
    }
}
exports.Comments = Comments;
Comments.rootElementName = "comments";
Comments.rootElementNameSingular = "comment";
Comments.prefixURI = "projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";
Comments.elementClass = comment_1.Comment;
//# sourceMappingURL=comments.js.map