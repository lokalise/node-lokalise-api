"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
class BaseModel {
    constructor(params) {
        for (const key of Object.keys(params)) {
            this[key] = params[key];
        }
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=base_model.js.map