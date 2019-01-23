"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const comment_1 = require("../models/comment");
class Comments extends base_collection_1.BaseCollection {
}
Comments.rootElementName = 'comments';
Comments.prefixURI = 'projects/{!:project_id}/comments/{:id}';
Comments.elementClass = comment_1.Comment;
exports.Comments = Comments;
//# sourceMappingURL=comments.js.map