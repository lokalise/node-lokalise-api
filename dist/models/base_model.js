export class BaseModel {
    constructor(params) {
        for (const key of Object.keys(params)) {
            this[key] = params[key];
        }
    }
}
//# sourceMappingURL=base_model.js.map