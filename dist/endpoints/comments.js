"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../http_client/base");
class Comments {
    static list() {
        return new base_1.ApiRequest('projects', 'get');
    }
}
exports.Comments = Comments;
//# sourceMappingURL=comments.js.map