// src/models/base_model.ts
var BaseModel = class {
  constructor(params) {
    for (const key of Object.keys(params)) {
      this[key] = params[key];
    }
  }
};

// src/models/branch.ts
var Branch = class extends BaseModel {
};

// src/lokalise/pkg.ts
import { readFile } from "node:fs/promises";
var LokalisePkg = class _LokalisePkg {
  static pkgPath() {
    return "../../package.json";
  }
  static async getVersion() {
    let pkg;
    try {
      pkg = JSON.parse(
        (await readFile(new URL(_LokalisePkg.pkgPath(), import.meta.url))).toString()
      );
    } catch (_e) {
      pkg = null;
    }
    return pkg ? pkg.version : "unknown";
  }
};

// src/http_client/base.ts
var ApiRequest = class {
  promise;
  params = {};
  urlRoot = "https://api.lokalise.com/api2/";
  constructor(uri, method, body, params, clientData) {
    this.params = { ...params };
    this.promise = this.createPromise(uri, method, body, clientData);
  }
  async createPromise(uri, method, body, clientData) {
    const url = this.composeURI(`/${clientData.version}/${uri}`);
    const prefixUrl = clientData.host ?? this.urlRoot;
    const headers = await this.buildHeaders(clientData, method, body);
    const options = {
      method,
      headers,
      ...method !== "GET" && body ? { body: JSON.stringify(body) } : {}
    };
    const target = new URL(url, prefixUrl);
    target.search = new URLSearchParams(this.params).toString();
    return this.fetchAndHandleResponse(target, options);
  }
  async fetchAndHandleResponse(target, options) {
    try {
      const response = await fetch(target, options);
      return this.processResponse(response);
    } catch (err) {
      return Promise.reject({ message: err.message });
    }
  }
  async processResponse(response) {
    let responseJSON = null;
    try {
      if (response.status === 204) {
        responseJSON = null;
      } else {
        responseJSON = await response.json();
      }
    } catch (_error) {
      return Promise.reject({
        message: response.statusText,
        code: response.status
      });
    }
    if (response.ok) {
      return {
        json: responseJSON,
        headers: response.headers
      };
    }
    return Promise.reject(this.getErrorFromResp(responseJSON));
  }
  async buildHeaders(clientData, method, body) {
    const headers = new Headers({
      Accept: "application/json",
      "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`
    });
    headers.append(
      clientData.authHeader,
      `${clientData.tokenType} ${clientData.token}`
    );
    if (clientData.enableCompression) {
      headers.append("Accept-Encoding", "gzip,deflate");
    }
    if (method !== "GET" && body) {
      headers.append("Content-type", "application/json");
    }
    return headers;
  }
  getErrorFromResp(respJson) {
    if (typeof respJson.error === "object") {
      return respJson.error;
    }
    return respJson;
  }
  composeURI(rawUri) {
    const regexp = /{(!{0,1}):(\w*)}/g;
    const uri = rawUri.replace(regexp, this.mapUriParams());
    return uri.endsWith("/") ? uri.slice(0, -1) : uri;
  }
  mapUriParams() {
    return (_entity, isMandaratory, paramName) => {
      if (this.params[paramName] != null) {
        const t_param = this.params[paramName];
        delete this.params[paramName];
        return t_param;
      }
      if (isMandaratory === "!") {
        throw new Error(`Missing required param: ${paramName}`);
      }
      return "";
    };
  }
};

// src/models/paginated_result.ts
var PaginatedResult = class {
  totalResults;
  totalPages;
  resultsPerPage;
  currentPage;
  items;
  constructor(items, headers) {
    this.totalResults = this.safeParseInt(
      headers.get("x-pagination-total-count")
    );
    this.totalPages = this.safeParseInt(headers.get("x-pagination-page-count"));
    this.resultsPerPage = this.safeParseInt(headers.get("x-pagination-limit"));
    this.currentPage = this.safeParseInt(headers.get("x-pagination-page"));
    this.items = items;
  }
  hasNextPage() {
    return this.currentPage > 0 && this.currentPage < this.totalPages;
  }
  hasPrevPage() {
    return this.currentPage > 1;
  }
  isLastPage() {
    return !this.hasNextPage();
  }
  isFirstPage() {
    return !this.hasPrevPage();
  }
  nextPage() {
    if (this.isLastPage()) {
      return this.currentPage;
    }
    return this.currentPage + 1;
  }
  prevPage() {
    if (this.isFirstPage()) {
      return this.currentPage;
    }
    return this.currentPage - 1;
  }
  safeParseInt(str) {
    if (!str || Number.isNaN(Number(str))) {
      return 0;
    }
    return Number.parseInt(str, 10);
  }
};

// src/models/cursor_paginated_result.ts
var CursorPaginatedResult = class extends PaginatedResult {
  nextCursor;
  constructor(items, headers) {
    super(items, headers);
    this.nextCursor = headers.get("x-pagination-next-cursor");
  }
  hasNextCursor() {
    return this.nextCursor !== null;
  }
};

// src/collections/base_collection.ts
var BaseCollection = class {
  clientData;
  static rootElementName;
  static rootElementNameSingular;
  static endpoint;
  static prefixURI;
  static elementClass;
  // Secondaries are used when an instance of a different class has to be created
  // For example, uploading a File may return a QueuedProcess
  static secondaryElementNameSingular;
  static secondaryElementClass;
  constructor(clientData) {
    this.clientData = clientData;
  }
  doList(req_params) {
    const params = {
      ...req_params
    };
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      null
    );
  }
  doListCursor(req_params) {
    const params = {
      ...req_params
    };
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJsonCursor,
      this.handleReject,
      null
    );
  }
  doGet(id, req_params = {}) {
    const params = {
      ...req_params,
      id
    };
    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      null
    );
  }
  doDelete(id, req_params = {}) {
    const params = {
      ...req_params,
      id
    };
    return this.createPromise(
      "DELETE",
      params,
      this.returnBareJSON,
      this.handleReject,
      null
    );
  }
  doCreate(body, req_params = {}, resolveFn = this.populateObjectFromJson) {
    const params = {
      ...req_params
    };
    return this.createPromise(
      "POST",
      params,
      resolveFn,
      this.handleReject,
      body
    );
  }
  doUpdate(id, body, req_params, resolveFn = this.populateObjectFromJsonRoot, method = "PUT") {
    const params = {
      ...req_params,
      id
    };
    return this.createPromise(
      method,
      params,
      resolveFn,
      this.handleReject,
      body
    );
  }
  populateObjectFromJsonRoot(json, headers) {
    const childClass = this.constructor;
    let jsonData = json;
    if (childClass.rootElementNameSingular) {
      jsonData = Object(jsonData)[childClass.rootElementNameSingular];
    }
    return this.populateObjectFromJson(jsonData, headers);
  }
  populateSecondaryObjectFromJsonRoot(json, headers) {
    const childClass = this.constructor;
    const secondaryJson = Object(json)[childClass.secondaryElementNameSingular];
    return this.populateObjectFromJson(secondaryJson, headers, true);
  }
  populateObjectFromJson(json, _headers, secondary = false) {
    const childClass = this.constructor;
    return secondary ? new childClass.secondaryElementClass(json) : new childClass.elementClass(json);
  }
  populateArrayFromJsonBulk(json, headers) {
    const childClass = this.constructor;
    const arr = [];
    const jsonArray = json[childClass.rootElementName];
    for (const obj of jsonArray) {
      arr.push(this.populateObjectFromJson(obj, headers));
    }
    const result = {
      errors: json.errors,
      items: arr
    };
    return result;
  }
  populateArrayFromJson(json, headers) {
    const resultArray = this.populateArray(json, headers);
    return this.isPaginated(headers) ? new PaginatedResult(resultArray, headers) : resultArray;
  }
  populateArray(json, headers) {
    const childClass = this.constructor;
    return json[childClass.rootElementName].map(
      (obj) => this.populateObjectFromJson(obj, headers)
    );
  }
  isPaginated(headers) {
    return !!headers.get("x-pagination-total-count") && !!headers.get("x-pagination-page");
  }
  populateArrayFromJsonCursor(json, headers) {
    const childClass = this.constructor;
    const arr = [];
    const jsonArray = json[childClass.rootElementName];
    for (const obj of jsonArray) {
      arr.push(this.populateObjectFromJson(obj, headers));
    }
    return new CursorPaginatedResult(arr, headers);
  }
  populateApiErrorFromJson(json) {
    return json;
  }
  returnBareJSON(json) {
    return json;
  }
  handleReject(data) {
    return this.populateApiErrorFromJson(data);
  }
  async createPromise(method, params, resolveFn, rejectFn, body, uri = null) {
    const request = this.prepareRequest(method, body, params, uri);
    try {
      const data = await this.sendRequest(request);
      return resolveFn ? resolveFn.call(this, data.json, data.headers) : null;
    } catch (err) {
      return this.handleError(err, rejectFn);
    }
  }
  sendRequest(request) {
    return request.promise;
  }
  handleError(err, rejectFn) {
    return Promise.reject(rejectFn.call(this, err));
  }
  prepareRequest(method, body, params, uri) {
    return new ApiRequest(
      this.getUri(uri),
      method,
      body,
      params,
      this.clientData
    );
  }
  getUri(uri) {
    const childClass = this.constructor;
    const resolvedUri = uri ? uri : childClass.prefixURI;
    return resolvedUri;
  }
  objToArray(raw_body) {
    if (!Array.isArray(raw_body)) {
      return Array(raw_body);
    }
    return raw_body;
  }
};

// src/collections/branches.ts
var Branches = class extends BaseCollection {
  static rootElementName = "branches";
  static rootElementNameSingular = "branch";
  static prefixURI = "projects/{!:project_id}/branches/{:id}";
  static elementClass = Branch;
  list(request_params) {
    return this.doList(request_params);
  }
  create(branch_params, request_params) {
    return this.doCreate(
      branch_params,
      request_params,
      this.populateObjectFromJsonRoot
    );
  }
  get(branch_id, request_params) {
    return this.doGet(branch_id, request_params);
  }
  update(branch_id, branch_params, request_params) {
    return this.doUpdate(branch_id, branch_params, request_params);
  }
  delete(branch_id, request_params) {
    return this.doDelete(branch_id, request_params);
  }
  merge(branch_id, request_params, body = {}) {
    const params = {
      ...request_params,
      ...{ id: branch_id }
    };
    return this.createPromise(
      "POST",
      params,
      this.returnBareJSON,
      this.handleReject,
      body,
      "projects/{!:project_id}/branches/{:id}/merge"
    );
  }
};

// src/models/comment.ts
var Comment = class extends BaseModel {
};

// src/collections/comments.ts
var Comments = class extends BaseCollection {
  static rootElementName = "comments";
  static rootElementNameSingular = "comment";
  static prefixURI = "projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";
  static elementClass = Comment;
  list(request_params) {
    return this.doList(request_params);
  }
  create(comment_params, request_params) {
    const body = { comments: this.objToArray(comment_params) };
    return this.doCreate(body, request_params, this.populateArrayFromJson);
  }
  get(comment_id, request_params) {
    return this.doGet(comment_id, request_params);
  }
  delete(comment_id, request_params) {
    return this.doDelete(comment_id, request_params);
  }
  list_project_comments(params) {
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      null,
      "projects/{!:project_id}/comments"
    );
  }
};

// src/models/contributor.ts
var Contributor = class extends BaseModel {
};

// src/collections/contributors.ts
var Contributors = class extends BaseCollection {
  static rootElementName = "contributors";
  static rootElementNameSingular = "contributor";
  static prefixURI = "projects/{!:project_id}/contributors/{:id}";
  static elementClass = Contributor;
  list(request_params) {
    return this.doList(request_params);
  }
  create(contributor_params, request_params) {
    const body = { contributors: this.objToArray(contributor_params) };
    return this.doCreate(body, request_params, this.populateArrayFromJson);
  }
  get(contributor_id, request_params) {
    return this.doGet(contributor_id, request_params);
  }
  update(contributor_id, contributor_params, request_params) {
    return this.doUpdate(contributor_id, contributor_params, request_params);
  }
  delete(contributor_id, request_params) {
    return this.doDelete(contributor_id, request_params);
  }
};

// src/models/file.ts
var File = class extends BaseModel {
};

// src/models/queued_process.ts
var QueuedProcess = class extends BaseModel {
};

// src/collections/files.ts
var Files = class extends BaseCollection {
  static rootElementName = "files";
  static prefixURI = "projects/{!:project_id}/files/{:id}";
  static elementClass = File;
  static secondaryElementNameSingular = "process";
  static secondaryElementClass = QueuedProcess;
  list(request_params) {
    return this.doList(request_params);
  }
  upload(project_id, upload) {
    return this.createPromise(
      "POST",
      { project_id },
      this.populateSecondaryObjectFromJsonRoot,
      this.handleReject,
      upload,
      "projects/{!:project_id}/files/upload"
    );
  }
  download(project_id, download) {
    return this.createPromise(
      "POST",
      { project_id },
      this.returnBareJSON,
      this.handleReject,
      download,
      "projects/{!:project_id}/files/download"
    );
  }
  delete(file_id, request_params) {
    return this.doDelete(file_id, request_params);
  }
};

// src/models/jwt.ts
var Jwt = class extends BaseModel {
};

// src/collections/jwt.ts
var Jwt2 = class extends BaseCollection {
  static prefixURI = "projects/{!:project_id}/tokens";
  static elementClass = Jwt;
  create(project_id, body = { service: "ota" }) {
    const request_params = { project_id };
    return this.doCreate(body, request_params, this.populateObjectFromJson);
  }
};

// src/models/key.ts
var Key = class extends BaseModel {
};

// src/collections/keys.ts
var Keys = class extends BaseCollection {
  static rootElementName = "keys";
  static rootElementNameSingular = "key";
  static prefixURI = "projects/{!:project_id}/keys/{:id}";
  static elementClass = Key;
  list(request_params) {
    return this.doListCursor(request_params);
  }
  create(key_params, request_params) {
    return this.doCreate(
      key_params,
      request_params,
      this.populateArrayFromJsonBulk
    );
  }
  get(key_id, request_params) {
    return this.doGet(key_id, request_params);
  }
  update(key_id, key_params, request_params) {
    return this.doUpdate(key_id, key_params, request_params);
  }
  delete(key_id, request_params) {
    return this.doDelete(key_id, request_params);
  }
  bulk_update(key_params, request_params) {
    return this.createPromise(
      "PUT",
      request_params,
      this.populateArrayFromJsonBulk,
      this.handleReject,
      key_params,
      "projects/{!:project_id}/keys"
    );
  }
  bulk_delete(key_ids, request_params) {
    const keys = { keys: this.objToArray(key_ids) };
    return this.createPromise(
      "DELETE",
      request_params,
      this.returnBareJSON,
      this.handleReject,
      keys,
      "projects/{!:project_id}/keys"
    );
  }
};

// src/models/language.ts
var Language = class extends BaseModel {
};

// src/collections/languages.ts
var Languages = class extends BaseCollection {
  static rootElementName = "languages";
  static rootElementNameSingular = "language";
  static prefixURI = "projects/{!:project_id}/languages/{:id}";
  static elementClass = Language;
  system_languages(params = {}) {
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      null,
      "system/languages"
    );
  }
  list(request_params) {
    return this.doList(request_params);
  }
  create(raw_body, request_params) {
    const body = { languages: this.objToArray(raw_body) };
    return this.doCreate(body, request_params, this.populateArrayFromJsonBulk);
  }
  get(lang_id, request_params) {
    return this.doGet(lang_id, request_params);
  }
  update(lang_id, lang_params, request_params) {
    return this.doUpdate(lang_id, lang_params, request_params);
  }
  delete(lang_id, request_params) {
    return super.doDelete(lang_id, request_params);
  }
};

// src/models/order.ts
var Order = class extends BaseModel {
};

// src/collections/orders.ts
var Orders = class extends BaseCollection {
  static rootElementName = "orders";
  static prefixURI = "teams/{!:team_id}/orders/{:id}";
  static elementClass = Order;
  list(request_params) {
    return this.doList(request_params);
  }
  create(order_params, request_params) {
    return this.doCreate(
      order_params,
      request_params,
      this.populateObjectFromJsonRoot
    );
  }
  get(order_id, request_params) {
    return this.doGet(order_id, request_params);
  }
};

// src/models/payment_card.ts
var PaymentCard = class extends BaseModel {
};

// src/collections/payment_cards.ts
var PaymentCards = class extends BaseCollection {
  static rootElementName = "payment_cards";
  static rootElementNameSingular = "payment_card";
  static prefixURI = "payment_cards/{:id}";
  static elementClass = PaymentCard;
  list(request_params = {}) {
    return this.doList(request_params);
  }
  create(card_params) {
    return this.doCreate(card_params);
  }
  get(card_id) {
    return this.doGet(card_id);
  }
  delete(card_id) {
    return this.doDelete(card_id);
  }
};

// src/models/permission_template.ts
var PermissionTemplate = class extends BaseModel {
};

// src/collections/permission_templates.ts
var PermissionTemplates = class extends BaseCollection {
  static prefixURI = "teams/{!:team_id}/roles";
  static elementClass = PermissionTemplate;
  static rootElementName = "roles";
  list(request_params) {
    return this.doList(request_params);
  }
};

// src/models/project.ts
var Project = class extends BaseModel {
};

// src/collections/projects.ts
var Projects = class extends BaseCollection {
  static rootElementName = "projects";
  static prefixURI = "projects/{:id}";
  static elementClass = Project;
  list(request_params = {}) {
    return this.doList(request_params);
  }
  create(project_params) {
    return this.doCreate(project_params);
  }
  get(project_id) {
    return this.doGet(project_id);
  }
  update(project_id, project_params) {
    return this.doUpdate(
      project_id,
      project_params,
      {},
      this.populateObjectFromJson
    );
  }
  delete(project_id) {
    return this.doDelete(project_id);
  }
  empty(project_id) {
    return this.createPromise(
      "PUT",
      { project_id },
      this.returnBareJSON,
      this.handleReject,
      null,
      "projects/{!:project_id}/empty"
    );
  }
};

// src/collections/queued_processes.ts
var QueuedProcesses = class extends BaseCollection {
  static rootElementName = "processes";
  static rootElementNameSingular = "process";
  static prefixURI = "projects/{!:project_id}/processes/{:id}";
  static elementClass = QueuedProcess;
  list(request_params) {
    return this.doList(request_params);
  }
  get(process_id, request_params) {
    return this.doGet(process_id, request_params);
  }
};

// src/models/screenshot.ts
var Screenshot = class extends BaseModel {
};

// src/collections/screenshots.ts
var Screenshots = class extends BaseCollection {
  static rootElementName = "screenshots";
  static rootElementNameSingular = "screenshot";
  static prefixURI = "projects/{!:project_id}/screenshots/{:id}";
  static elementClass = Screenshot;
  list(request_params) {
    return this.doList(request_params);
  }
  create(raw_body, request_params) {
    const body = { screenshots: this.objToArray(raw_body) };
    return this.doCreate(body, request_params, this.populateArrayFromJsonBulk);
  }
  get(screnshot_id, request_params) {
    return this.doGet(screnshot_id, request_params);
  }
  update(screenshot_id, screenshot_params, request_params) {
    return this.doUpdate(screenshot_id, screenshot_params, request_params);
  }
  delete(screenshot_id, request_params) {
    return this.doDelete(screenshot_id, request_params);
  }
};

// src/models/segment.ts
var Segment = class extends BaseModel {
};

// src/collections/segments.ts
var Segments = class extends BaseCollection {
  static rootElementName = "segments";
  static rootElementNameSingular = "segment";
  static prefixURI = "projects/{!:project_id}/keys/{!:key_id}/segments/{!:language_iso}/{:id}";
  static elementClass = Segment;
  list(request_params) {
    return this.doList(request_params);
  }
  get(segment_number, request_params) {
    return this.doGet(segment_number, request_params);
  }
  update(segment_number, segment_params, request_params) {
    return this.doUpdate(segment_number, segment_params, request_params);
  }
};

// src/models/snapshot.ts
var Snapshot = class extends BaseModel {
};

// src/collections/snapshots.ts
var Snapshots = class extends BaseCollection {
  static rootElementName = "snapshots";
  static rootElementNameSingular = "snapshot";
  static prefixURI = "projects/{!:project_id}/snapshots/{:id}";
  static elementClass = Snapshot;
  list(request_params) {
    return this.doList(request_params);
  }
  create(snapshot_params, request_params) {
    return this.doCreate(
      snapshot_params,
      request_params,
      this.populateObjectFromJsonRoot
    );
  }
  restore(snapshot_id, request_params) {
    const params = {
      ...request_params,
      ...{ id: snapshot_id }
    };
    return this.createPromise(
      "POST",
      params,
      this.returnBareJSON,
      this.handleReject,
      {}
    );
  }
  delete(snapshot_id, request_params) {
    return this.doDelete(snapshot_id, request_params);
  }
};

// src/models/task.ts
var Task = class extends BaseModel {
};

// src/collections/tasks.ts
var Tasks = class extends BaseCollection {
  static rootElementName = "tasks";
  static rootElementNameSingular = "task";
  static prefixURI = "projects/{!:project_id}/tasks/{:id}";
  static elementClass = Task;
  list(request_params) {
    return this.doList(request_params);
  }
  create(task_params, request_params) {
    return this.doCreate(
      task_params,
      request_params,
      this.populateObjectFromJsonRoot
    );
  }
  get(task_id, request_params) {
    return this.doGet(task_id, request_params);
  }
  update(task_id, task_params, request_params) {
    return this.doUpdate(task_id, task_params, request_params);
  }
  delete(task_id, request_params) {
    return this.doDelete(task_id, request_params);
  }
};

// src/models/team_user_billing_details.ts
var TeamUserBillingDetails = class extends BaseModel {
};

// src/collections/team_user_billing_details.ts
var TeamUserBillingDetails2 = class extends BaseCollection {
  static rootElementName = "";
  static prefixURI = "teams/{!:team_id}/billing_details";
  static elementClass = TeamUserBillingDetails;
  get(team_id) {
    const params = { team_id };
    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJson,
      this.handleReject,
      null
    );
  }
  create(billing_details_params, request_params) {
    return this.doCreate(billing_details_params, request_params);
  }
  update(team_id, billing_details_params) {
    const params = { team_id };
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJson,
      this.handleReject,
      billing_details_params
    );
  }
};

// src/models/team_user.ts
var TeamUser = class extends BaseModel {
};

// src/collections/team_users.ts
var TeamUsers = class extends BaseCollection {
  static rootElementName = "team_users";
  static rootElementNameSingular = "team_user";
  static prefixURI = "teams/{!:team_id}/users/{:id}";
  static elementClass = TeamUser;
  list(request_params) {
    return this.doList(request_params);
  }
  get(team_user_id, request_params) {
    return this.doGet(team_user_id, request_params);
  }
  update(team_user_id, team_user_params, request_params) {
    return this.doUpdate(team_user_id, team_user_params, request_params);
  }
  delete(team_user_id, request_params) {
    return this.doDelete(team_user_id, request_params);
  }
};

// src/models/team.ts
var Team = class extends BaseModel {
};

// src/collections/teams.ts
var Teams = class extends BaseCollection {
  static rootElementName = "teams";
  static prefixURI = "teams";
  static elementClass = Team;
  list(request_params = {}) {
    return this.doList(request_params);
  }
};

// src/models/translation_provider.ts
var TranslationProvider = class extends BaseModel {
};

// src/collections/translation_providers.ts
var TranslationProviders = class extends BaseCollection {
  static rootElementName = "translation_providers";
  static prefixURI = "teams/{!:team_id}/translation_providers/{:id}";
  static elementClass = TranslationProvider;
  list(request_params) {
    return this.doList(request_params);
  }
  get(provider_id, request_params) {
    return this.doGet(provider_id, request_params);
  }
};

// src/models/translation_status.ts
var TranslationStatus = class extends BaseModel {
};

// src/collections/translation_statuses.ts
var TranslationStatuses = class extends BaseCollection {
  static rootElementName = "custom_translation_statuses";
  static prefixURI = "projects/{!:project_id}/custom_translation_statuses/{:id}";
  static elementClass = TranslationStatus;
  static rootElementNameSingular = "custom_translation_status";
  list(request_params) {
    return this.doList(request_params);
  }
  create(translation_status_params, request_params) {
    return this.doCreate(
      translation_status_params,
      request_params,
      this.populateObjectFromJsonRoot
    );
  }
  get(translation_status_id, request_params) {
    return this.doGet(translation_status_id, request_params);
  }
  update(translation_status_id, translation_status_params, request_params) {
    return this.doUpdate(
      translation_status_id,
      translation_status_params,
      request_params
    );
  }
  delete(translation_status_id, request_params) {
    return this.doDelete(translation_status_id, request_params);
  }
  available_colors(request_params) {
    return this.createPromise(
      "GET",
      request_params,
      this.returnBareJSON,
      this.handleReject,
      {},
      "projects/{!:project_id}/custom_translation_statuses/colors"
    );
  }
};

// src/models/translation.ts
var Translation = class extends BaseModel {
};

// src/collections/translations.ts
var Translations = class extends BaseCollection {
  static rootElementName = "translations";
  static rootElementNameSingular = "translation";
  static prefixURI = "projects/{!:project_id}/translations/{:id}";
  static elementClass = Translation;
  list(request_params) {
    return this.doListCursor(request_params);
  }
  get(translation_id, request_params) {
    return this.doGet(translation_id, request_params);
  }
  update(translation_id, translation_params, request_params) {
    return this.doUpdate(translation_id, translation_params, request_params);
  }
};

// src/models/user_group.ts
var UserGroup = class extends BaseModel {
};

// src/collections/user_groups.ts
var UserGroups = class extends BaseCollection {
  static rootElementName = "user_groups";
  static prefixURI = "teams/{!:team_id}/groups/{:id}";
  static elementClass = UserGroup;
  list(request_params) {
    return this.doList(request_params);
  }
  create(user_group_params, request_params) {
    return this.doCreate(
      user_group_params,
      request_params,
      this.populateGroupFromJsonRoot
    );
  }
  get(user_group_id, request_params) {
    return this.doGet(user_group_id, request_params);
  }
  update(user_group_id, user_group_params, request_params) {
    return this.doUpdate(
      user_group_id,
      user_group_params,
      request_params,
      this.populateGroupFromJsonRoot
    );
  }
  delete(user_group_id, request_params) {
    return this.doDelete(user_group_id, request_params);
  }
  add_members_to_group(team_id, group_id, user_ids) {
    const params = {
      team_id,
      group_id
    };
    const body = { users: user_ids };
    return this.createPromise(
      "PUT",
      params,
      this.populateGroupFromJsonRoot,
      this.handleReject,
      body,
      "teams/{!:team_id}/groups/{!:group_id}/members/add"
    );
  }
  remove_members_from_group(team_id, group_id, user_ids) {
    const params = {
      team_id,
      group_id
    };
    const body = { users: user_ids };
    return this.createPromise(
      "PUT",
      params,
      this.populateGroupFromJsonRoot,
      this.handleReject,
      body,
      "teams/{!:team_id}/groups/{!:group_id}/members/remove"
    );
  }
  add_projects_to_group(team_id, group_id, project_ids) {
    const params = {
      team_id,
      group_id
    };
    const body = { projects: project_ids };
    return this.createPromise(
      "PUT",
      params,
      this.populateGroupFromJsonRoot,
      this.handleReject,
      body,
      "teams/{!:team_id}/groups/{!:group_id}/projects/add"
    );
  }
  remove_projects_from_group(team_id, group_id, project_ids) {
    const params = {
      team_id,
      group_id
    };
    const body = { projects: project_ids };
    return this.createPromise(
      "PUT",
      params,
      this.populateGroupFromJsonRoot,
      this.handleReject,
      body,
      "teams/{!:team_id}/groups/{!:group_id}/projects/remove"
    );
  }
  populateGroupFromJsonRoot(json, headers) {
    const formatted_json = json.group;
    return this.populateObjectFromJson(formatted_json, headers);
  }
};

// src/models/webhook.ts
var Webhook = class extends BaseModel {
};

// src/collections/webhooks.ts
var Webhooks = class extends BaseCollection {
  static rootElementName = "webhooks";
  static rootElementNameSingular = "webhook";
  static prefixURI = "projects/{!:project_id}/webhooks/{:id}";
  static elementClass = Webhook;
  list(request_params) {
    return this.doList(request_params);
  }
  create(webhook_params, request_params) {
    return this.doCreate(
      webhook_params,
      request_params,
      this.populateObjectFromJsonRoot
    );
  }
  get(webhook_id, request_params) {
    return this.doGet(webhook_id, request_params);
  }
  update(webhook_id, webhook_params, request_params) {
    return this.doUpdate(webhook_id, webhook_params, request_params);
  }
  delete(webhook_id, request_params) {
    return this.doDelete(webhook_id, request_params);
  }
  regenerate_secret(webhook_id, request_params) {
    const params = {
      ...request_params,
      ...{ id: webhook_id }
    };
    return this.createPromise(
      "PATCH",
      params,
      this.returnBareJSON,
      this.handleReject,
      null,
      "projects/{!:project_id}/webhooks/{:id}/secret/regenerate"
    );
  }
};

// src/lokalise/base_client.ts
var BaseClient = class {
  clientData = {
    token: "",
    tokenType: "",
    authHeader: "x-api-token",
    enableCompression: false
  };
  /*
   * Instantiate LokaliseApi to call API methods
   * @param params  object, mandatory
   * @returns       LokaliseApi object to work with.
   */
  constructor(params) {
    const apiKey = params.apiKey;
    if (apiKey === null || apiKey === void 0 || apiKey.length === 0) {
      throw new Error("Error: Instantiation failed: Please pass an API key");
    }
    this.clientData.token = apiKey;
    const compression = params.enableCompression;
    if (compression !== null && compression !== void 0) {
      this.clientData.enableCompression = compression;
    }
    this.clientData.host = params.host;
  }
};

// src/lokalise/lokalise_api.ts
var LokaliseApi = class extends BaseClient {
  constructor(params) {
    super(params);
    this.clientData.version = params.version ?? "api2";
  }
  branches() {
    return new Branches(this.clientData);
  }
  comments() {
    return new Comments(this.clientData);
  }
  contributors() {
    return new Contributors(this.clientData);
  }
  files() {
    return new Files(this.clientData);
  }
  jwt() {
    return new Jwt2(this.clientData);
  }
  keys() {
    return new Keys(this.clientData);
  }
  languages() {
    return new Languages(this.clientData);
  }
  orders() {
    return new Orders(this.clientData);
  }
  paymentCards() {
    return new PaymentCards(this.clientData);
  }
  permissionTemplates() {
    return new PermissionTemplates(this.clientData);
  }
  projects() {
    return new Projects(this.clientData);
  }
  queuedProcesses() {
    return new QueuedProcesses(this.clientData);
  }
  screenshots() {
    return new Screenshots(this.clientData);
  }
  segments() {
    return new Segments(this.clientData);
  }
  snapshots() {
    return new Snapshots(this.clientData);
  }
  tasks() {
    return new Tasks(this.clientData);
  }
  teams() {
    return new Teams(this.clientData);
  }
  teamUsers() {
    return new TeamUsers(this.clientData);
  }
  teamUserBillingDetails() {
    return new TeamUserBillingDetails2(this.clientData);
  }
  translations() {
    return new Translations(this.clientData);
  }
  translationProviders() {
    return new TranslationProviders(this.clientData);
  }
  translationStatuses() {
    return new TranslationStatuses(this.clientData);
  }
  userGroups() {
    return new UserGroups(this.clientData);
  }
  webhooks() {
    return new Webhooks(this.clientData);
  }
};

// src/lokalise/lokalise_api_oauth.ts
var LokaliseApiOAuth = class extends LokaliseApi {
  constructor(params) {
    super(params);
    const tokenType = params.tokenType;
    this.clientData.tokenType = tokenType ?? "Bearer";
    this.clientData.authHeader = "Authorization";
  }
};

// src/models/ota/ota_bundle.ts
var OtaBundle = class extends BaseModel {
};

// src/ota_collections/ota_collection.ts
var OtaCollection = class extends BaseCollection {
  populateApiErrorFromJson(json) {
    return json;
  }
  doDelete(id, req_params) {
    const params = {
      ...req_params,
      id
    };
    return this.createPromise(
      "DELETE",
      params,
      this.returnJSONFromData,
      this.handleReject,
      null
    );
  }
  returnJSONFromData(json) {
    return json.data;
  }
};

// src/ota_collections/ota_bundle_management.ts
var OtaBundleManagement = class extends OtaCollection {
  static rootElementName = "data";
  static rootElementNameSingular = "data";
  static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundles/{:id}";
  static elementClass = OtaBundle;
  list(request_params) {
    return this.doList(request_params);
  }
  get(bundleId, requestParams) {
    return this.doGet(bundleId, requestParams);
  }
  update(bundleId, bundleParams, requestParams) {
    return this.doUpdate(
      bundleId,
      bundleParams,
      requestParams,
      this.populateObjectFromJsonRoot,
      "PATCH"
    );
  }
  delete(bundleId, requestParams) {
    return this.doDelete(bundleId, requestParams);
  }
};

// src/ota_collections/ota_bundle_publishing.ts
var OtaBundlePublishing = class extends OtaCollection {
  static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/frameworks/{!:framework}/{!:action}";
  publish(bundleId, request_params) {
    const params = {
      ...request_params,
      ...{ action: "publish" }
    };
    return this.createPromise("POST", params, null, this.handleReject, {
      bundleId
    });
  }
  stage(bundleId, request_params) {
    const params = {
      ...request_params,
      ...{ action: "stage" }
    };
    return this.createPromise("POST", params, null, this.handleReject, {
      bundleId
    });
  }
};

// src/models/ota/ota_freeze_period.ts
var OtaFreezePeriod = class extends BaseModel {
};

// src/ota_collections/ota_freeze_periods.ts
var OtaFreezePeriods = class extends OtaCollection {
  static rootElementName = "data";
  static rootElementNameSingular = "data";
  static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundle-freezes/{:id}";
  static elementClass = OtaFreezePeriod;
  list(requestParams) {
    return this.doList(requestParams);
  }
  create(freezeParams, requestParams) {
    return this.doCreate(
      freezeParams,
      requestParams,
      this.populateObjectFromJsonRoot
    );
  }
  update(freezeId, freezeParams, requestParams) {
    return this.doUpdate(freezeId, freezeParams, requestParams);
  }
  delete(freezeId, requestParams) {
    return this.doDelete(freezeId, requestParams);
  }
};

// src/models/ota/ota_sdk_token.ts
var OtaSdkToken = class extends BaseModel {
};

// src/ota_collections/ota_sdk_tokens.ts
var OtaSdkTokens = class extends OtaCollection {
  static rootElementName = "data";
  static rootElementNameSingular = "data";
  static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/tokens/{:id}";
  static elementClass = OtaSdkToken;
  list(request_params) {
    return this.doList(request_params);
  }
  create(request_params) {
    return this.doCreate(null, request_params, this.populateObjectFromJsonRoot);
  }
  delete(tokenId, request_params) {
    return this.doDelete(tokenId, request_params);
  }
};

// src/models/ota/ota_statistics.ts
var OtaStatistics = class extends BaseModel {
};

// src/ota_collections/ota_usage_statistics.ts
var OtaUsageStatistics = class extends OtaCollection {
  static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/stats";
  static elementClass = OtaStatistics;
  get(bundle_params, request_params) {
    const params = {
      ...request_params,
      ...bundle_params
    };
    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJson,
      this.handleReject,
      null
    );
  }
};

// src/lokalise/lokalise_api_ota.ts
var LokaliseApiOta = class extends BaseClient {
  constructor(params) {
    super(params);
    this.clientData.tokenType = params.tokenType ?? "Bearer";
    this.clientData.authHeader = "Authorization";
    this.clientData.host = this.clientData.host ?? "https://ota.lokalise.com";
    this.clientData.version = params.version ?? "v3";
  }
  otaBundleManagement() {
    return new OtaBundleManagement(this.clientData);
  }
  otaBundlePublishing() {
    return new OtaBundlePublishing(this.clientData);
  }
  otaUsageStatistics() {
    return new OtaUsageStatistics(this.clientData);
  }
  otaFreezePeriods() {
    return new OtaFreezePeriods(this.clientData);
  }
  otaSdkTokens() {
    return new OtaSdkTokens(this.clientData);
  }
};

// src/models/ota/ota_bundle_archive.ts
var OtaBundleArchive = class extends BaseModel {
};

// src/ota_collections/ota_bundles.ts
var OtaBundles = class extends OtaCollection {
  static rootElementNameSingular = "data";
  static prefixURI = "lokalise/projects/{!:lokaliseProjectId}/frameworks/{!:framework}";
  static elementClass = OtaBundleArchive;
  get(bundle_params, request_params) {
    const params = {
      ...request_params,
      ...bundle_params
    };
    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      null
    );
  }
};

// src/lokalise/lokalise_ota_bundles.ts
var LokaliseOtaBundles = class extends BaseClient {
  constructor(params) {
    super(params);
    this.clientData.authHeader = "x-ota-api-token";
    this.clientData.host = this.clientData.host ?? "https://ota.lokalise.com";
    this.clientData.version = params.version ?? "v3";
  }
  otaBundles() {
    return new OtaBundles(this.clientData);
  }
};

// src/oauth2/auth_request.ts
var AuthRequest = class _AuthRequest {
  static async createPromise(uri, method, body, { host, version }) {
    const fullUri = `/${version}/${uri}`;
    const target = new URL(fullUri, host);
    const options = {
      method,
      headers: await _AuthRequest.buildHeaders(),
      body: JSON.stringify(body)
    };
    return _AuthRequest.fetchAndHandleResponse(target, options);
  }
  static async fetchAndHandleResponse(target, options) {
    try {
      const response = await fetch(target, options);
      const responseJSON = await response.json();
      if (response.ok) {
        return Promise.resolve({
          json: responseJSON,
          headers: response.headers
        });
      }
      return Promise.reject({
        ...{ code: response.status },
        ...responseJSON
      });
    } catch (err) {
      return Promise.reject({
        message: err.message
      });
    }
  }
  static async buildHeaders() {
    const headers = new Headers({
      Accept: "application/json",
      "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
      "Content-type": "application/json"
    });
    return headers;
  }
};

// src/oauth2/lokalise_auth.ts
var LokaliseAuth = class {
  authData = {
    client_id: "",
    client_secret: ""
  };
  /*
   * Instantiate LokaliseAuth to work with OAuth 2 tokens
   * @param clientId      string, mandatory
   * @param clientSecret  string, mandatory
   * @returns             LokaliseAuth object to work with.
   */
  constructor(clientId, clientSecret, host, version) {
    if (clientId == null || clientId.length === 0 || clientSecret == null || clientSecret.length === 0) {
      throw new Error(
        "Error: Instantiation failed: Please pass client id and client secret"
      );
    }
    this.authData.client_id = clientId;
    this.authData.client_secret = clientSecret;
    this.authData.host = host ?? "https://app.lokalise.com";
    this.authData.version = version ?? "oauth2";
  }
  auth(scope, redirect_uri, state) {
    const scopeString = Array.isArray(scope) ? scope.join(" ") : scope;
    const params = {
      client_id: this.authData.client_id,
      scope: scopeString,
      ...state && { state },
      ...redirect_uri && { redirect_uri }
    };
    return this.buildUrl(params);
  }
  async token(code) {
    const params = {
      ...this.base_params(),
      ...{
        code,
        grant_type: "authorization_code"
      }
    };
    return await this.doRequest(params);
  }
  async refresh(refresh_token) {
    const params = {
      ...this.base_params(),
      ...{
        refresh_token,
        grant_type: "refresh_token"
      }
    };
    return await this.doRequest(params);
  }
  async doRequest(params) {
    try {
      const data = await AuthRequest.createPromise(
        "token",
        "POST",
        params,
        this.authData
      );
      return data.json;
    } catch (err) {
      return Promise.reject(this.handleReject(err));
    }
  }
  buildUrl(params) {
    const url = new URL("auth", this.authData.host);
    url.search = new URLSearchParams(params).toString();
    return url.toString();
  }
  base_params() {
    return {
      client_id: this.authData.client_id,
      client_secret: this.authData.client_secret
    };
  }
  handleReject(data) {
    return data;
  }
};
export {
  LokaliseApi,
  LokaliseApiOAuth,
  LokaliseApiOta,
  LokaliseAuth,
  LokaliseOtaBundles
};
//# sourceMappingURL=main.js.map