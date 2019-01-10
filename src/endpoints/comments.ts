import { ApiRequest } from '../http_client/base';
import { Comment } from '../models/comment';

export class Comments {
  static list() {
    return new ApiRequest('projects', 'get');
  }

  // static get(id) {
  //   return new Promise((resolve, reject) => {
  //     response: ApiRequest = new ApiRequest('projects', 'get', { id: id })
  //     response.promise.then((result) => {
  //       resolve(this.$loadFromJson(result))
  //     }).then((data) => {
  //       reject(data)
  //     });
  // }
}
