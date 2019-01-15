"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base_model");
class Project extends base_model_1.BaseModel {
}
Project.rootElementName = 'projects';
Project.uriPrefix = 'projects/:id';
Project.mandaratoryParams = ['name'];
Project.optionalParams = ['description', 'team_id'];
exports.Project = Project;
//# sourceMappingURL=project.js.map