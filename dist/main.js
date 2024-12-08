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
function pkgPath() {
  return "../../package.json";
}
async function getVersion() {
  try {
    const data = await readFile(new URL(pkgPath(), import.meta.url));
    const pkg = JSON.parse(data.toString());
    return String(pkg.version);
  } catch {
    return "unknown";
  }
}

// src/models/api_error.ts
var ApiError = class extends Error {
  code;
  details;
  constructor(message, code, details) {
    super(message);
    this.code = code;
    this.details = details;
  }
};

// src/http_client/base.ts
var ApiRequest = class {
  /**
   * A Promise that resolves to an ApiResponse containing the parsed JSON and headers.
   */
  promise;
  /**
   * Query and path parameters used to construct the request URL.
   * This object is modified during URL construction, removing parameters used in path segments.
   */
  params = {};
  /**
   * The default base URL for the Lokalise API.
   */
  urlRoot = "https://api.lokalise.com/api2/";
  /**
   * Constructs a new ApiRequest instance.
   * @param uri - The endpoint URI (versioned path expected).
   * @param method - The HTTP method (GET, POST, PUT, DELETE, etc).
   * @param body - The request payload, if applicable.
   * @param params - Query and/or path parameters.
   * @param clientData - Authentication and configuration data for the request.
   */
  constructor(uri, method, body, params, clientData) {
    this.params = { ...params };
    this.promise = this.createPromise(uri, method, body, clientData);
  }
  /**
   * Creates the request promise by composing the URL, building headers, and executing the fetch.
   * @param uri - The endpoint URI.
   * @param method - The HTTP method.
   * @param body - The request payload.
   * @param clientData - Client configuration and auth data.
   * @returns A promise resolving to an ApiResponse or rejecting with an ApiError.
   */
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
    return this.fetchAndHandleResponse(
      target,
      options,
      clientData.requestTimeout
    );
  }
  /**
   * Executes the fetch request and handles network-level errors.
   * Applies a request timeout if specified.
   * @param target - The fully constructed request URL.
   * @param options - The fetch request options.
   * @param requestTimeout - Optional timeout in milliseconds.
   * @returns A promise resolving to an ApiResponse or rejecting with an ApiError.
   */
  async fetchAndHandleResponse(target, options, requestTimeout) {
    const controller = new AbortController();
    let timeoutId = null;
    if (requestTimeout && requestTimeout > 0) {
      timeoutId = setTimeout(() => controller.abort(), requestTimeout);
    }
    try {
      const response = await fetch(target, {
        ...options,
        signal: controller.signal
      });
      return this.processResponse(response);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          return Promise.reject(
            new ApiError(`Request timed out after ${requestTimeout}ms`, 408, {
              reason: "timeout"
            })
          );
        }
        return Promise.reject(
          new ApiError(err.message, 500, { reason: "network or fetch error" })
        );
      }
      return Promise.reject(
        new ApiError("An unknown error occurred", 500, {
          reason: String(err)
        })
      );
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }
  /**
   * Processes the fetch response.
   * Attempts to parse JSON unless the status is 204 (No Content).
   * @param response - The raw fetch Response object.
   * @returns A promise resolving to an ApiResponse if successful, or rejecting with ApiError otherwise.
   */
  async processResponse(response) {
    let responseJSON = null;
    try {
      if (response.status !== 204) {
        responseJSON = await response.json();
      }
    } catch (error) {
      return Promise.reject(
        new ApiError(error.message, response.status, {
          statusText: response.statusText,
          reason: "JSON parsing error"
        })
      );
    }
    if (response.ok) {
      return {
        json: responseJSON,
        headers: response.headers
      };
    }
    return Promise.reject(this.getErrorFromResp(responseJSON));
  }
  /**
   * Derives an ApiError instance from the response JSON, which may follow various patterns.
   * @param respJson - The parsed JSON response from the server.
   * @returns An ApiError representing the server error.
   */
  getErrorFromResp(respJson) {
    if (!respJson || typeof respJson !== "object") {
      return new ApiError("An unknown error occurred", 500, {
        reason: "unexpected response format"
      });
    }
    const errorObj = respJson;
    if (typeof errorObj.message === "string" && typeof errorObj.statusCode === "number" && typeof errorObj.error === "string") {
      return new ApiError(errorObj.message, errorObj.statusCode, {
        reason: errorObj.error
      });
    }
    if (errorObj.error && typeof errorObj.error === "object") {
      const {
        message = "Unknown error",
        code = 500,
        details
      } = errorObj.error;
      return new ApiError(
        String(message),
        typeof code === "number" ? code : 500,
        details ?? { reason: "server error without details" }
      );
    }
    if (typeof errorObj.message === "string" && (typeof errorObj.code === "number" || typeof errorObj.errorCode === "number")) {
      const statusCode = typeof errorObj.code === "number" ? errorObj.code : errorObj.errorCode;
      return new ApiError(
        errorObj.message,
        statusCode,
        errorObj.details ?? { reason: "server error without details" }
      );
    }
    return new ApiError("An unknown error occurred", 500, {
      reason: "unhandled error format",
      data: respJson
    });
  }
  /**
   * Builds the request headers, including authentication, compression, and JSON headers as needed.
   * @param clientData - Client configuration and auth data.
   * @param method - The HTTP method.
   * @param body - The request payload.
   * @returns A promise resolving to the constructed Headers.
   */
  async buildHeaders(clientData, method, body) {
    const headers = new Headers({
      Accept: "application/json",
      "User-Agent": `node-lokalise-api/${await getVersion()}`
    });
    headers.append(
      clientData.authHeader,
      clientData.tokenType.length > 0 ? `${clientData.tokenType} ${clientData.token}` : clientData.token
    );
    if (clientData.enableCompression) {
      headers.append("Accept-Encoding", "gzip,deflate");
    }
    if (method !== "GET" && body) {
      headers.append("Content-Type", "application/json");
    }
    return headers;
  }
  /**
   * Composes the final URI by replacing placeholders of the form `/{!:{paramName}}`
   * with the corresponding parameter values.
   * @param rawUri - The raw URI template.
   * @returns The final composed URI string.
   * @throws Error if a required parameter is missing.
   */
  composeURI(rawUri) {
    const regexp = /{(!{0,1}):(\w*)}/g;
    const uri = rawUri.replace(regexp, this.mapUriParams());
    return uri.endsWith("/") ? uri.slice(0, -1) : uri;
  }
  /**
   * Returns a function that maps URI parameters from placeholders.
   * @returns A function used as a replacement callback in `composeURI`.
   * @throws Error if a required parameter is missing.
   */
  mapUriParams() {
    return (_substring, isMandatory, paramName) => {
      if (this.params[paramName] != null) {
        const paramValue = String(this.params[paramName]);
        delete this.params[paramName];
        return paramValue;
      }
      if (isMandatory === "!") {
        throw new Error(`Missing required parameter: ${paramName}`);
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
  /**
   * Client data containing authentication and configuration details.
   * Provided by a `BaseClient` or similar client instance.
   */
  clientData;
  /**
   * Static endpoint property that subclasses can define to indicate the API endpoint
   * for this collection. If not set, ensure `prefixURI` or `uri` parameters are passed.
   */
  static endpoint;
  /**
   * Static prefixURI property that subclasses can define to indicate a base path.
   * If `uri` is not passed explicitly, this prefix is used to construct the request URL.
   */
  static prefixURI;
  /**
   * Constructs a new BaseCollection instance.
   * @param clientData - Client data for making authenticated requests.
   */
  constructor(clientData) {
    this.clientData = clientData;
  }
  /**
   * Getter that must be overridden by subclasses to return the root element name
   * for array-based JSON responses.
   * @throws Error if not defined by the subclass.
   */
  get rootElementName() {
    throw new Error(
      "rootElementName is not defined. Subclasses must override `rootElementName`."
    );
  }
  /**
   * Getter that may be overridden by subclasses to return the root element name
   * for single-item JSON responses.
   * @throws Error if not defined by the subclass.
   */
  get rootElementNameSingular() {
    throw new Error(
      "rootElementNameSingular is not defined. Subclasses must override `rootElementNameSingular`."
    );
  }
  /**
   * Getter that may be overridden by subclasses if a secondary model type is returned.
   * By default, this throws an error. If needed, override it in the subclass.
   */
  get secondaryElementClass() {
    throw new Error(
      "Secondary elements are not supported by this collection. Override `secondaryElementClass` if needed."
    );
  }
  /**
   * Getter that must be overridden if `secondaryElementClass` is used.
   * Returns the JSON property name for the secondary element.
   * @throws Error if not defined by the subclass that uses secondary elements.
   */
  get secondaryElementNameSingular() {
    throw new Error(
      "secondaryElementNameSingular is not defined. Subclasses must override this if secondary elements are used."
    );
  }
  /**
   * Perform a GET request that expects a list of items.
   * @param params Optional query or request parameters.
   * @returns A promise resolving to either a paginated result or an array of ElementType.
   */
  doList(params) {
    return this.createPromise("GET", params, this.populateArrayFromJson, null);
  }
  /**
   * Perform a GET request that expects a cursor-paginated list of items.
   * @param params Optional query or request parameters.
   * @returns A promise resolving to a CursorPaginatedResult of ElementType.
   */
  doListCursor(params) {
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJsonCursor,
      null
    );
  }
  /**
   * Perform a GET request to retrieve a single item by its ID.
   * @param id The ID of the item to retrieve.
   * @param params Optional query or request parameters.
   * @returns A promise resolving to a single ElementType instance.
   */
  doGet(id, params = {}) {
    return this.createPromise(
      "GET",
      { ...params, id },
      this.populateObjectFromJsonRoot,
      null
    );
  }
  /**
   * Perform a DELETE request to remove a single item by its ID.
   * @param id The ID of the item to delete.
   * @param params Optional query or request parameters.
   * @returns A promise resolving to JSON representing the deletion result.
   */
  doDelete(id, params = {}) {
    return this.createPromise(
      "DELETE",
      { ...params, id },
      this.returnBareJSON,
      null
    );
  }
  /**
   * Perform a POST request to create a new resource.
   * @param body The object or array of objects to send in the request body.
   * @param params Optional query or request parameters.
   * @param resolveFn Optional custom resolve handler to parse the response.
   * @returns A promise resolving to an ElementType or SecondaryType instance.
   */
  doCreate(body, params = {}, resolveFn = this.populateObjectFromJson) {
    return this.createPromise("POST", params, resolveFn, body);
  }
  /**
   * Perform a POST request to create multiple resources at once.
   * @param body The object or array of objects to send in the request body.
   * @param params Optional query or request parameters.
   * @param resolveFn Optional custom resolve handler to parse the response array.
   * @returns A promise resolving to an array of ElementType.
   */
  doCreateArray(body, params, resolveFn = this.populateArray) {
    return this.createPromise("POST", params, resolveFn, body);
  }
  /**
   * Perform an UPDATE (PUT/PATCH) request to modify an existing resource by its ID.
   * @param id The ID of the item to update.
   * @param body The updated fields to send in the request body.
   * @param params Optional query or request parameters.
   * @param resolveFn Optional custom resolve handler to parse the response object.
   * @param method The HTTP method to use, typically PUT or PATCH.
   * @returns A promise resolving to the updated ElementType instance.
   */
  doUpdate(id, body, params, resolveFn = this.populateObjectFromJsonRoot, method = "PUT") {
    return this.createPromise(method, { ...params, id }, resolveFn, body);
  }
  /**
   * Parse a JSON response that contains a single item under a known root element name.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   * @returns The parsed ElementType instance.
   * @throws Error if the expected root element name is missing.
   */
  populateObjectFromJsonRoot(json, headers) {
    let jsonData = json;
    const rootElementName = this.rootElementNameSingular;
    if (this.rootElementNameSingular && rootElementName) {
      const dataRecord = jsonData;
      jsonData = dataRecord[rootElementName];
      if (!jsonData) {
        throw new Error(`Missing property '${rootElementName}' in JSON object`);
      }
    }
    return this.populateObjectFromJson(jsonData, headers);
  }
  /**
   * Parse a JSON response that contains a secondary item under a known secondary root element name.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   * @returns The parsed SecondaryType instance.
   * @throws Error if the expected secondary element name is missing.
   */
  populateSecondaryObjectFromJsonRoot(json, headers) {
    const root = this.secondaryElementNameSingular;
    const record = json;
    const itemJson = record[root];
    if (!itemJson) {
      throw new Error(
        `Missing expected secondary property '${root}' in JSON response.`
      );
    }
    return this.populateObjectFromJson(
      itemJson,
      headers,
      true
    );
  }
  /**
   * Parse a JSON response that contains an array of items along with bulk result details.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   * @returns A BulkResult object containing items and potential errors.
   * @throws Error if the expected root element is missing or not an array.
   */
  populateArrayFromJsonBulk(json, headers) {
    const root = this.rootElementName;
    const jsonArray = json[root];
    if (!Array.isArray(jsonArray)) {
      throw new Error(
        `Expected an array under '${root}' but received: ${typeof jsonArray}`
      );
    }
    const items = jsonArray.map(
      (obj) => this.populateObjectFromJson(obj, headers)
    );
    return {
      errors: json.errors,
      items
    };
  }
  /**
   * Parse a JSON response that contains an array of items.
   * If pagination headers are detected, returns a PaginatedResult.
   * Otherwise, returns a plain array of ElementType.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   */
  populateArrayFromJson(json, headers) {
    const array = this.populateArray(json, headers);
    return this.isPaginated(headers) ? new PaginatedResult(array, headers) : array;
  }
  /**
   * Parse a JSON response that contains an array of items.
   * This method returns a plain array and does not consider pagination.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   */
  populateArray(json, headers) {
    const root = this.rootElementName;
    const jsonArray = json[root];
    if (!Array.isArray(jsonArray)) {
      throw new Error(
        `Expected an array under '${root}' but received: ${typeof jsonArray}`
      );
    }
    return jsonArray.map(
      (obj) => this.populateObjectFromJson(obj, headers)
    );
  }
  /**
   * Parse a JSON response that contains a cursor-paginated array of items.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   */
  populateArrayFromJsonCursor(json, headers) {
    const root = this.rootElementName;
    const jsonArray = json[root];
    if (!Array.isArray(jsonArray)) {
      throw new Error(
        `Expected an array under '${root}' for cursor pagination but received: ${typeof jsonArray}`
      );
    }
    const items = jsonArray.map(
      (obj) => this.populateObjectFromJson(obj, headers)
    );
    return new CursorPaginatedResult(items, headers);
  }
  /**
   * Parse a JSON object into either an ElementType or a SecondaryType instance.
   * @param json The raw JSON object returned by the API.
   * @param _headers The response headers (if needed).
   * @param secondary If true, use the secondaryElementClass instead of elementClass.
   */
  populateObjectFromJson(json, _headers, secondary = false) {
    const cls = secondary ? this.secondaryElementClass : this.elementClass;
    return new cls(json);
  }
  /**
   * Return the raw JSON as-is.
   * @param json The raw JSON object or array returned by the API.
   */
  returnBareJSON(json) {
    return json;
  }
  /**
   * Convert a single object into an array if it's not already an array.
   * @param raw_body The raw request body.
   */
  objToArray(raw_body) {
    return Array.isArray(raw_body) ? raw_body : [raw_body];
  }
  /**
   * Create a Promise that sends an HTTP request and resolves with a parsed response.
   * @param method The HTTP method (GET, POST, PUT, DELETE, etc.).
   * @param params Query or request parameters.
   * @param resolveFn A function to resolve and parse the JSON response.
   * @param body The request body, if applicable.
   * @param uri An explicit URI to use for the request. If not provided, prefixURI is used.
   */
  async createPromise(method, params, resolveFn, body, uri = null) {
    const request = this.prepareRequest(method, body, params, uri);
    const data = await this.sendRequest(request);
    return resolveFn.call(this, data.json, data.headers);
  }
  /**
   * Prepare the API request by creating a new ApiRequest instance.
   * @param method The HTTP method.
   * @param body The request body.
   * @param params The request parameters.
   * @param uri An explicit URI for the request or null.
   */
  prepareRequest(method, body, params, uri) {
    return new ApiRequest(
      this.getUri(uri),
      method,
      body,
      params,
      this.clientData
    );
  }
  /**
   * Send the prepared request and return its promise.
   * @param request The ApiRequest instance to send.
   * @returns A Promise resolving to an ApiResponse.
   */
  sendRequest(request) {
    return request.promise;
  }
  /**
   * Determine the URI for the request. If uri is not provided, use prefixURI.
   * @param uri An explicit URI or null.
   * @throws Error if no URI or prefixURI is provided.
   */
  getUri(uri) {
    const childClass = this.constructor;
    const resolvedUri = uri ?? childClass.prefixURI;
    if (!resolvedUri) {
      throw new Error(
        "No URI or prefixURI provided. Ensure the subclass defines a static prefixURI or pass a URI explicitly."
      );
    }
    return resolvedUri;
  }
  /**
   * Determine if the response headers indicate pagination.
   * @param headers The response headers.
   */
  isPaginated(headers) {
    return !!headers.get("x-pagination-total-count") && !!headers.get("x-pagination-page");
  }
};

// src/collections/branches.ts
var Branches = class extends BaseCollection {
  static prefixURI = "projects/{!:project_id}/branches/{:id}";
  get elementClass() {
    return Branch;
  }
  get rootElementName() {
    return "branches";
  }
  get rootElementNameSingular() {
    return "branch";
  }
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
  static prefixURI = "projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";
  get elementClass() {
    return Comment;
  }
  get rootElementName() {
    return "comments";
  }
  get rootElementNameSingular() {
    return "comment";
  }
  list(request_params) {
    return this.doList(request_params);
  }
  create(comment_params, request_params) {
    const body = { comments: this.objToArray(comment_params) };
    return this.doCreateArray(body, request_params);
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
  static prefixURI = "projects/{!:project_id}/contributors/{:id}";
  get elementClass() {
    return Contributor;
  }
  get rootElementName() {
    return "contributors";
  }
  get rootElementNameSingular() {
    return "contributor";
  }
  list(request_params) {
    return this.doList(request_params);
  }
  create(contributor_params, request_params) {
    const body = { contributors: this.objToArray(contributor_params) };
    return this.doCreateArray(body, request_params);
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
  static prefixURI = "projects/{!:project_id}/files/{:id}";
  get elementClass() {
    return File;
  }
  get rootElementName() {
    return "files";
  }
  get secondaryElementClass() {
    return QueuedProcess;
  }
  get secondaryElementNameSingular() {
    return "process";
  }
  list(request_params) {
    return this.doList(request_params);
  }
  upload(project_id, upload) {
    return this.createPromise(
      "POST",
      { project_id },
      this.populateSecondaryObjectFromJsonRoot,
      upload,
      "projects/{!:project_id}/files/upload"
    );
  }
  download(project_id, download) {
    return this.createPromise(
      "POST",
      { project_id },
      this.returnBareJSON,
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
  get elementClass() {
    return Jwt;
  }
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
  static prefixURI = "projects/{!:project_id}/keys/{:id}";
  get elementClass() {
    return Key;
  }
  get rootElementName() {
    return "keys";
  }
  get rootElementNameSingular() {
    return "key";
  }
  list(request_params) {
    return this.doListCursor(request_params);
  }
  create(key_params, request_params) {
    return this.createPromise(
      "POST",
      request_params,
      this.populateArrayFromJsonBulk,
      key_params
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
  static prefixURI = "projects/{!:project_id}/languages/{:id}";
  get elementClass() {
    return Language;
  }
  get rootElementName() {
    return "languages";
  }
  get rootElementNameSingular() {
    return "language";
  }
  system_languages(params = {}) {
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      null,
      "system/languages"
    );
  }
  list(request_params) {
    return this.doList(request_params);
  }
  create(raw_body, request_params) {
    const body = { languages: this.objToArray(raw_body) };
    return this.createPromise(
      "POST",
      request_params,
      this.populateArrayFromJsonBulk,
      body
    );
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
  static prefixURI = "teams/{!:team_id}/orders/{:id}";
  get elementClass() {
    return Order;
  }
  get rootElementName() {
    return "orders";
  }
  get rootElementNameSingular() {
    return null;
  }
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
  static prefixURI = "payment_cards/{:id}";
  get elementClass() {
    return PaymentCard;
  }
  get rootElementName() {
    return "payment_cards";
  }
  get rootElementNameSingular() {
    return "payment_card";
  }
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
  get elementClass() {
    return PermissionTemplate;
  }
  get rootElementName() {
    return "roles";
  }
  list(request_params) {
    return this.doList(request_params);
  }
};

// src/models/project.ts
var Project = class extends BaseModel {
};

// src/collections/projects.ts
var Projects = class extends BaseCollection {
  static prefixURI = "projects/{:id}";
  get elementClass() {
    return Project;
  }
  get rootElementName() {
    return "projects";
  }
  get rootElementNameSingular() {
    return null;
  }
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
      null,
      "projects/{!:project_id}/empty"
    );
  }
};

// src/collections/queued_processes.ts
var QueuedProcesses = class extends BaseCollection {
  static prefixURI = "projects/{!:project_id}/processes/{:id}";
  get elementClass() {
    return QueuedProcess;
  }
  get rootElementName() {
    return "processes";
  }
  get rootElementNameSingular() {
    return "process";
  }
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
  static prefixURI = "projects/{!:project_id}/screenshots/{:id}";
  get elementClass() {
    return Screenshot;
  }
  get rootElementName() {
    return "screenshots";
  }
  get rootElementNameSingular() {
    return "screenshot";
  }
  list(request_params) {
    return this.doList(request_params);
  }
  create(raw_body, request_params) {
    const body = { screenshots: this.objToArray(raw_body) };
    return this.createPromise(
      "POST",
      request_params,
      this.populateArrayFromJsonBulk,
      body
    );
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
  static prefixURI = "projects/{!:project_id}/keys/{!:key_id}/segments/{!:language_iso}/{:id}";
  get elementClass() {
    return Segment;
  }
  get rootElementName() {
    return "segments";
  }
  get rootElementNameSingular() {
    return "segment";
  }
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
  static prefixURI = "projects/{!:project_id}/snapshots/{:id}";
  get elementClass() {
    return Snapshot;
  }
  get rootElementName() {
    return "snapshots";
  }
  get rootElementNameSingular() {
    return "snapshot";
  }
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
    return this.createPromise("POST", params, this.returnBareJSON, {});
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
  static prefixURI = "projects/{!:project_id}/tasks/{:id}";
  get elementClass() {
    return Task;
  }
  get rootElementName() {
    return "tasks";
  }
  get rootElementNameSingular() {
    return "task";
  }
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
  static prefixURI = "teams/{!:team_id}/billing_details";
  get elementClass() {
    return TeamUserBillingDetails;
  }
  get(team_id) {
    const params = { team_id };
    return this.createPromise("GET", params, this.populateObjectFromJson, null);
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
      billing_details_params
    );
  }
};

// src/models/team_user.ts
var TeamUser = class extends BaseModel {
};

// src/collections/team_users.ts
var TeamUsers = class extends BaseCollection {
  static prefixURI = "teams/{!:team_id}/users/{:id}";
  get elementClass() {
    return TeamUser;
  }
  get rootElementName() {
    return "team_users";
  }
  get rootElementNameSingular() {
    return "team_user";
  }
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
  static prefixURI = "teams";
  get elementClass() {
    return Team;
  }
  get rootElementName() {
    return "teams";
  }
  list(request_params = {}) {
    return this.doList(request_params);
  }
};

// src/models/translation_provider.ts
var TranslationProvider = class extends BaseModel {
};

// src/collections/translation_providers.ts
var TranslationProviders = class extends BaseCollection {
  static prefixURI = "teams/{!:team_id}/translation_providers/{:id}";
  get elementClass() {
    return TranslationProvider;
  }
  get rootElementName() {
    return "translation_providers";
  }
  get rootElementNameSingular() {
    return null;
  }
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
  static prefixURI = "projects/{!:project_id}/custom_translation_statuses/{:id}";
  get elementClass() {
    return TranslationStatus;
  }
  get rootElementName() {
    return "custom_translation_statuses";
  }
  get rootElementNameSingular() {
    return "custom_translation_status";
  }
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
  static prefixURI = "projects/{!:project_id}/translations/{:id}";
  get elementClass() {
    return Translation;
  }
  get rootElementName() {
    return "translations";
  }
  get rootElementNameSingular() {
    return "translation";
  }
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
  static prefixURI = "teams/{!:team_id}/groups/{:id}";
  get elementClass() {
    return UserGroup;
  }
  get rootElementName() {
    return "user_groups";
  }
  get rootElementNameSingular() {
    return null;
  }
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
  static prefixURI = "projects/{!:project_id}/webhooks/{:id}";
  get elementClass() {
    return Webhook;
  }
  get rootElementName() {
    return "webhooks";
  }
  get rootElementNameSingular() {
    return "webhook";
  }
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
      null,
      "projects/{!:project_id}/webhooks/{:id}/secret/regenerate"
    );
  }
};

// src/lokalise/base_client.ts
var BaseClient = class {
  /**
   * Internal client data including token, token type, host, compression, and timeouts.
   */
  clientData = {
    token: "",
    tokenType: "",
    authHeader: "x-api-token",
    enableCompression: false,
    requestTimeout: void 0
  };
  /**
   * Constructs a new BaseClient instance.
   * @param params - Configuration parameters including API key and optional features.
   * @throws Error if the API key is not provided or is empty.
   */
  constructor(params) {
    const { apiKey } = params;
    if (!apiKey || apiKey.trim().length === 0) {
      throw new Error(
        "Instantiation failed: A non-empty API key must be provided."
      );
    }
    this.clientData.token = apiKey;
    this.clientData.enableCompression = params.enableCompression ?? false;
    this.clientData.tokenType = params.tokenType ?? "";
    this.clientData.host = params.host;
    this.clientData.requestTimeout = params.requestTimeout;
  }
};

// src/lokalise/lokalise_api.ts
var LokaliseApi = class extends BaseClient {
  /**
   * Creates a new instance of the LokaliseApi client.
   * @param params - Configuration parameters including `apiKey` and optional `version`, `host`, etc.
   */
  constructor(params) {
    super(params);
    this.clientData.version = params.version ?? "api2";
  }
  /**
   * Access Branch-related endpoints.
   */
  branches() {
    return new Branches(this.clientData);
  }
  /**
   * Access Comment-related endpoints.
   */
  comments() {
    return new Comments(this.clientData);
  }
  /**
   * Access Contributor-related endpoints.
   */
  contributors() {
    return new Contributors(this.clientData);
  }
  /**
   * Access File-related endpoints.
   */
  files() {
    return new Files(this.clientData);
  }
  /**
   * Access JWT-related endpoints.
   */
  jwt() {
    return new Jwt2(this.clientData);
  }
  /**
   * Access Key-related endpoints.
   */
  keys() {
    return new Keys(this.clientData);
  }
  /**
   * Access Language-related endpoints.
   */
  languages() {
    return new Languages(this.clientData);
  }
  /**
   * Access Order-related endpoints.
   */
  orders() {
    return new Orders(this.clientData);
  }
  /**
   * Access Payment Card-related endpoints.
   */
  paymentCards() {
    return new PaymentCards(this.clientData);
  }
  /**
   * Access Permission Template-related endpoints.
   */
  permissionTemplates() {
    return new PermissionTemplates(this.clientData);
  }
  /**
   * Access Project-related endpoints.
   */
  projects() {
    return new Projects(this.clientData);
  }
  /**
   * Access Queued Process-related endpoints.
   */
  queuedProcesses() {
    return new QueuedProcesses(this.clientData);
  }
  /**
   * Access Screenshot-related endpoints.
   */
  screenshots() {
    return new Screenshots(this.clientData);
  }
  /**
   * Access Segment-related endpoints.
   */
  segments() {
    return new Segments(this.clientData);
  }
  /**
   * Access Snapshot-related endpoints.
   */
  snapshots() {
    return new Snapshots(this.clientData);
  }
  /**
   * Access Task-related endpoints.
   */
  tasks() {
    return new Tasks(this.clientData);
  }
  /**
   * Access Team-related endpoints.
   */
  teams() {
    return new Teams(this.clientData);
  }
  /**
   * Access Team User-related endpoints.
   */
  teamUsers() {
    return new TeamUsers(this.clientData);
  }
  /**
   * Access Team User Billing Detail-related endpoints.
   */
  teamUserBillingDetails() {
    return new TeamUserBillingDetails2(this.clientData);
  }
  /**
   * Access Translation-related endpoints.
   */
  translations() {
    return new Translations(this.clientData);
  }
  /**
   * Access Translation Provider-related endpoints.
   */
  translationProviders() {
    return new TranslationProviders(this.clientData);
  }
  /**
   * Access Translation Status-related endpoints.
   */
  translationStatuses() {
    return new TranslationStatuses(this.clientData);
  }
  /**
   * Access User Group-related endpoints.
   */
  userGroups() {
    return new UserGroups(this.clientData);
  }
  /**
   * Access Webhook-related endpoints.
   */
  webhooks() {
    return new Webhooks(this.clientData);
  }
};

// src/lokalise/lokalise_api_oauth.ts
var LokaliseApiOAuth = class extends LokaliseApi {
  /**
   * Constructs a new LokaliseApiOAuth client instance.
   * @param params - Configuration parameters including `apiKey` (OAuth token)
   *                 and optionally `tokenType` (defaults to "Bearer").
   * @throws Error If `apiKey` is missing or empty.
   */
  constructor(params) {
    super(params);
    this.clientData.tokenType = params.tokenType ?? "Bearer";
    this.clientData.authHeader = "Authorization";
  }
};

// src/models/ota/ota_bundle.ts
var OtaBundle = class extends BaseModel {
};

// src/ota_collections/ota_collection.ts
var OtaCollection = class extends BaseCollection {
  doDelete(id, req_params) {
    const params = {
      ...req_params,
      id
    };
    return this.createPromise(
      "DELETE",
      params,
      this.returnJSONFromData,
      null
    );
  }
  returnJSONFromData(json) {
    return json.data;
  }
  async createVoidPromise(method, params, body, uri = null) {
    const request = this.prepareRequest(method, body, params, uri);
    await this.sendRequest(request);
    return null;
  }
};

// src/ota_collections/ota_bundle_management.ts
var OtaBundleManagement = class extends OtaCollection {
  static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundles/{:id}";
  get elementClass() {
    return OtaBundle;
  }
  get rootElementName() {
    return "data";
  }
  get rootElementNameSingular() {
    return "data";
  }
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
  // This is just a dummy implementation to keep linter happy
  // It's not used in this class
  // istanbul ignore next
  get elementClass() {
    return Branch;
  }
  publish(bundleId, request_params) {
    const params = {
      ...request_params,
      ...{ action: "publish" }
    };
    return this.createVoidPromise("POST", params, {
      bundleId
    });
  }
  stage(bundleId, request_params) {
    const params = {
      ...request_params,
      ...{ action: "stage" }
    };
    return this.createVoidPromise("POST", params, {
      bundleId
    });
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
  get elementClass() {
    return OtaBundleArchive;
  }
  get rootElementNameSingular() {
    return "data";
  }
  get(bundle_params, request_params) {
    const params = {
      ...request_params,
      ...bundle_params
    };
    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJsonRoot,
      null
    );
  }
};

// src/models/ota/ota_freeze_period.ts
var OtaFreezePeriod = class extends BaseModel {
};

// src/ota_collections/ota_freeze_periods.ts
var OtaFreezePeriods = class extends OtaCollection {
  static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundle-freezes/{:id}";
  get elementClass() {
    return OtaFreezePeriod;
  }
  get rootElementName() {
    return "data";
  }
  get rootElementNameSingular() {
    return "data";
  }
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
  static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/tokens/{:id}";
  get elementClass() {
    return OtaSdkToken;
  }
  get rootElementName() {
    return "data";
  }
  get rootElementNameSingular() {
    return "data";
  }
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
  get elementClass() {
    return OtaStatistics;
  }
  get(bundle_params, request_params) {
    const params = {
      ...request_params,
      ...bundle_params
    };
    return this.createPromise("GET", params, this.populateObjectFromJson, null);
  }
};

// src/lokalise/lokalise_api_ota.ts
var LokaliseApiOta = class extends BaseClient {
  /**
   * Creates a new LokaliseApiOta client instance.
   * @param params - Configuration parameters including `apiKey` and optional overrides for tokenType, host, version, etc.
   * @throws Error If `apiKey` is missing or empty.
   */
  constructor(params) {
    super(params);
    this.clientData.tokenType = params.tokenType ?? "Bearer";
    this.clientData.authHeader = "Authorization";
    this.clientData.host = this.clientData.host ?? "https://ota.lokalise.com";
    this.clientData.version = params.version ?? "v3";
  }
  /**
   * Provides access to the OtaBundleManagement collection.
   */
  otaBundleManagement() {
    return new OtaBundleManagement(this.clientData);
  }
  /**
   * Provides access to the OtaBundlePublishing collection.
   */
  otaBundlePublishing() {
    return new OtaBundlePublishing(this.clientData);
  }
  /**
   * Provides access to the OtaUsageStatistics collection.
   */
  otaUsageStatistics() {
    return new OtaUsageStatistics(this.clientData);
  }
  /**
   * Provides access to the OtaFreezePeriods collection.
   */
  otaFreezePeriods() {
    return new OtaFreezePeriods(this.clientData);
  }
  /**
   * Provides access to the OtaSdkTokens collection.
   */
  otaSdkTokens() {
    return new OtaSdkTokens(this.clientData);
  }
};

// src/lokalise/lokalise_ota_bundles.ts
var LokaliseOtaBundles = class extends BaseClient {
  /**
   * Constructs a new LokaliseOtaBundles client instance.
   * @param params - Configuration parameters, including the required `apiKey`.
   *                 Optional parameters include `version`, `host`, etc.
   *                 Defaults: `host` = "https://ota.lokalise.com", `version` = "v3".
   * @throws Error If no valid API key is provided.
   */
  constructor(params) {
    super(params);
    this.clientData.authHeader = "x-ota-api-token";
    this.clientData.host = this.clientData.host ?? "https://ota.lokalise.com";
    this.clientData.version = params.version ?? "v3";
  }
  /**
   * Provides access to the OtaBundles collection.
   * @returns An OtaBundles instance.
   */
  otaBundles() {
    return new OtaBundles(this.clientData);
  }
};

// src/oauth2/auth_request.ts
async function buildHeaders() {
  const headers = new Headers({
    Accept: "application/json",
    "User-Agent": `node-lokalise-api/${await getVersion()}`,
    "Content-type": "application/json"
  });
  return headers;
}
async function fetchAndHandleResponse(target, options) {
  try {
    const response = await fetch(target, options);
    const responseJSON = await response.json();
    if (response.ok) {
      return {
        json: responseJSON,
        headers: response.headers
      };
    }
    const error = {
      code: response.status,
      ...responseJSON
    };
    return Promise.reject(error);
  } catch (err) {
    const error = {
      error: err.message,
      code: 500,
      error_description: ""
    };
    return Promise.reject(error);
  }
}
async function createPromise(uri, method, body, { host, version }) {
  const fullUri = `/${version}/${uri}`;
  const target = new URL(fullUri, host);
  const options = {
    method,
    headers: await buildHeaders(),
    body: JSON.stringify(body)
  };
  return fetchAndHandleResponse(target, options);
}

// src/oauth2/lokalise_auth.ts
var LokaliseAuth = class {
  authData;
  /**
   * Instantiate LokaliseAuth to work with OAuth 2 tokens
   *
   * @param clientId - The client ID (mandatory)
   * @param clientSecret - The client secret (mandatory)
   * @param host - Optional host, defaults to "https://app.lokalise.com"
   * @param version - Optional API version, defaults to "oauth2"
   */
  constructor(clientId, clientSecret, host = "https://app.lokalise.com", version = "oauth2") {
    if (!clientId || !clientSecret) {
      throw new Error(
        "Error: Instantiation failed: Please pass client ID and client secret"
      );
    }
    this.authData = {
      client_id: clientId,
      client_secret: clientSecret,
      host,
      version
    };
  }
  /**
   * Generate the authorization URL
   *
   * @param scope - The scope(s) for the authorization
   * @param redirectUri - Optional redirect URI
   * @param state - Optional state parameter
   * @returns The authorization URL as a string
   */
  auth(scope, redirectUri, state) {
    const scopeString = Array.isArray(scope) ? scope.join(" ") : scope;
    const params = {
      client_id: this.authData.client_id,
      scope: scopeString,
      ...state && { state },
      ...redirectUri && { redirect_uri: redirectUri }
    };
    return this.buildUrl(params);
  }
  /**
   * Exchange an authorization code for an access token
   *
   * @param code - The authorization code
   * @returns A promise resolving to the token response
   */
  token(code) {
    const params = {
      ...this.baseParams(),
      code,
      grant_type: "authorization_code"
    };
    return this.doRequest(params);
  }
  /**
   * Refresh an access token using a refresh token
   *
   * @param refreshToken - The refresh token
   * @returns A promise resolving to the token response
   */
  refresh(refreshToken) {
    const params = {
      ...this.baseParams(),
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    };
    return this.doRequest(params);
  }
  /**
   * Internal method to perform the API request
   *
   * @param params - Request parameters
   * @returns A promise resolving to the API response
   */
  async doRequest(params) {
    try {
      const data = await createPromise("token", "POST", params, this.authData);
      return data.json;
    } catch (err) {
      throw this.handleReject(err);
    }
  }
  /**
   * Build the authorization URL
   *
   * @param params - URL parameters
   * @returns The complete URL as a string
   */
  buildUrl(params) {
    const url = new URL("auth", this.authData.host);
    url.search = new URLSearchParams(params).toString();
    return url.toString();
  }
  /**
   * Get the base parameters for authentication requests
   *
   * @returns A record containing the client ID and client secret
   */
  baseParams() {
    return {
      client_id: this.authData.client_id,
      client_secret: this.authData.client_secret
    };
  }
  /**
   * Handle API request errors and transform them into an `AuthError`
   *
   * @param error - The error object
   * @returns An `AuthError` instance
   */
  handleReject(error) {
    return error;
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