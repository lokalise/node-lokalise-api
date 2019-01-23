"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const contributor_1 = require("../models/contributor");
class Contributors extends base_collection_1.BaseCollection {
}
Contributors.rootElementName = 'contributors';
Contributors.prefixURI = 'projects/{!:project_id}/contributors/{:id}';
Contributors.elementClass = contributor_1.Contributor;
exports.Contributors = Contributors;
//# sourceMappingURL=contributors.js.map