"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseModel {
}
exports.BaseModel = BaseModel;
 > {
    return: new Promise((resolve, reject) => {
        let response = new ApiRequest('projects/' + id, 'get');
        response.promise.then((result) => {
            resolve(this.$loadFromJson(result));
        }).then((data) => {
            reject(data);
        });
    })
};
save();
{
    console.log('saving');
}
$loadFromJson(json, Object);
{
    for (let key in json) {
        this[key] = json[key];
    }
    return this;
}
//# sourceMappingURL=base_model.js.map