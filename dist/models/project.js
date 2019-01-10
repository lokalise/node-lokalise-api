"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base_model");
// import { Projects as ProjectsEndpoint } from '../endpoints/projects';
const base_1 = require("../http_client/base");
class Project extends base_model_1.BaseModel {
    get(id) {
        return new Promise((resolve, reject) => {
            let response = new base_1.ApiRequest('projects/' + id, 'get');
            response.promise.then((result) => {
                resolve(this.$loadFromJson(result));
            }).then((data) => {
                reject(data);
            });
        });
    }
}
exports.Project = Project;
//# sourceMappingURL=project.js.map