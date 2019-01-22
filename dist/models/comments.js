"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base_model");
class Comments extends base_model_1.BaseModel {
}
Comments.rootElementName = 'comments';
Comments.prefixURI = 'projects/{!:project_id}/comments/{:id}';
exports.Comments = Comments;
//# sourceMappingURL=comments.js.map