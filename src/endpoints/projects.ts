import { ApiRequest } from '../http_client/base';

export class Projects {
  list() {
     let response: ApiRequest = new ApiRequest('projects', 'get');
  }

  get(id) {
    let response: ApiRequest = new ApiRequest('projects', 'get', { id: id });
  }
}
