"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseModel {
    constructor(params) {
        for (let key of Object.keys(params)) {
            this[key] = params[key];
        }
        return this;
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=base_model.js.map