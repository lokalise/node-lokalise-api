//#region src/interfaces/paginated_result.d.ts
interface PaginatedResult<T = unknown> {
  readonly totalResults: number;
  readonly totalPages: number;
  readonly resultsPerPage: number;
  readonly currentPage: number;
  readonly items: T[];
  readonly responseTooBig: boolean;
  hasNextPage(): boolean;
  hasPrevPage(): boolean;
  isLastPage(): boolean;
  isFirstPage(): boolean;
  nextPage(): number;
  prevPage(): number;
}
//#endregion
//#region src/interfaces/branch.d.ts
interface Branch {
  branch_id: number;
  name: string;
  created_at: string;
  created_at_timestamp: number;
  created_by: number;
  created_by_email: string;
}
//#endregion
//#region src/models/base_model.d.ts
declare abstract class BaseModel<T extends Record<string, unknown> = Record<string, unknown>> {
  constructor(params: Partial<T>);
}
//#endregion
//#region src/models/branch.d.ts
declare class Branch$1 extends BaseModel implements Branch {
  branch_id: number;
  name: string;
  created_at: string;
  created_at_timestamp: number;
  created_by: number;
  created_by_email: string;
}
//#endregion
//#region src/types/branches.d.ts
type BranchParams = {
  name?: string;
};
type MergeBranchParams = {
  force_conflict_resolve_using?: "target" | "source";
  target_branch_id?: number | string;
};
type BranchDeleted = {
  project_id: string;
  branch_deleted: boolean;
};
type BranchMerged = {
  project_id: string;
  branch_merged: boolean;
  branch: Branch;
  target_branch: Branch;
};
//#endregion
//#region src/types/common_get_params.d.ts
type TeamOnly = {
  team_id: string | number;
};
type ProjectOnly = {
  project_id: string;
};
type PaginationParams = {
  page?: number;
  limit?: number;
};
type ProjectWithPagination = ProjectOnly & PaginationParams;
type CursorPagination = {
  limit?: number;
  pagination?: "offset" | "cursor";
  cursor?: string;
};
//#endregion
//#region src/interfaces/client_data.d.ts
interface ClientData {
  token: string;
  tokenType: string;
  authHeader: string;
  enableCompression: boolean;
  silent: boolean;
  host?: string | undefined;
  version?: string;
  requestTimeout?: number;
  userAgent?: string | undefined;
}
//#endregion
//#region src/interfaces/api_error.d.ts
/**
 * Interface representing the structure of an API error.
 */
interface IApiError {
  /**
   * The error message.
   */
  message: string;
  /**
   * The error code representing the type of API error.
   */
  code: number;
  /**
   * Additional details about the error (optional).
   */
  details?: Record<string, string | number | boolean>;
}
//#endregion
//#region src/models/api_error.d.ts
/**
 * Represents an API error with a specific code and optional details.
 */
declare class ApiError extends Error implements IApiError {
  /**
   * The error code representing the type of API error.
   */
  code: number;
  /**
   * Additional details about the error (optional).
   */
  details?: Record<string, string | number | boolean>;
  /**
   * Creates an instance of ApiError.
   *
   * @param {string} message - The error message.
   * @param {number} code - The error code.
   * @param {Record<string, string | number | boolean>} [details] - Additional details about the error.
   */
  constructor(message: string, code: number, details?: Record<string, string | number | boolean>);
  /**
   * Returns a string representation of the error, including code and details.
   *
   * @returns The formatted error message.
   */
  toString(): string;
}
//#endregion
//#region src/types/http_method.d.ts
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
//#endregion
//#region src/http_client/base.d.ts
type ApiResponse = {
  json: Record<string, unknown>;
  headers: Headers;
};
/**
 * Represents a single API request to the Lokalise API.
 * Handles URL construction, request initiation, response processing, and error handling.
 */
declare class ApiRequest {
  /**
   * The default base URL for the Lokalise API.
   */
  protected static readonly urlRoot = "https://api.lokalise.com/api2/";
  /**
   * The resolved response from the API request.
   */
  response?: ApiResponse;
  /**
   * Query and path parameters used to construct the request URL.
   * This object is modified during URL construction, removing parameters used in path segments.
   */
  params: Record<string, unknown>;
  /**
   * Constructs a new ApiRequest instance.
   * @param params - Query and/or path parameters.
   */
  constructor(params: Record<string, unknown>);
  static create(uri: string, method: HttpMethod, body: object | object[] | null, params: Record<string, unknown>, clientData: ClientData): Promise<ApiRequest & {
    response: ApiResponse;
  }>;
  /**
   * Creates the request promise by composing the URL, building headers, and executing the fetch.
   * @param uri - The endpoint URI.
   * @param method - The HTTP method.
   * @param body - The request payload.
   * @param clientData - Client configuration and auth data.
   * @returns A promise resolving to an ApiResponse or rejecting with an ApiError.
   */
  protected createPromise(uri: string, method: HttpMethod, body: object | object[] | null, clientData: ClientData): Promise<ApiResponse>;
  /**
   * Executes the fetch request and handles network-level errors.
   * Applies a request timeout if specified.
   * @param target - The fully constructed request URL.
   * @param options - The fetch request options.
   * @param requestTimeout - Optional timeout in milliseconds.
   * @returns A promise resolving to an ApiResponse or rejecting with an ApiError.
   */
  protected fetchAndHandleResponse(target: URL, options: RequestInit, requestTimeout?: number): Promise<ApiResponse>;
  /**
   * Processes the fetch response.
   * Attempts to parse JSON unless the status is 204 (No Content).
   * @param response - The raw fetch Response object.
   * @returns A promise resolving to an ApiResponse if successful, or rejecting with ApiError otherwise.
   */
  protected processResponse(response: Response): Promise<ApiResponse>;
  /**
   * Derives an ApiError instance from the response JSON, which may follow various patterns.
   * @param respJson - The parsed JSON response from the server.
   * @returns An ApiError representing the server error.
   */
  protected getErrorFromResp(respJson: unknown): ApiError;
  /**
   * Builds the request headers, including authentication, compression, and JSON headers as needed.
   * @param clientData - Client configuration and auth data.
   * @param method - The HTTP method.
   * @param body - The request payload.
   * @returns A promise resolving to the constructed Headers.
   */
  protected buildHeaders(clientData: ClientData, method: HttpMethod, body: object | object[] | null): Promise<Headers>;
  /**
   * Composes the final URI by replacing placeholders of the form `/{!:{paramName}}`
   * with the corresponding parameter values.
   * @param rawUri - The raw URI template.
   * @returns The final composed URI string.
   * @throws Error if a required parameter is missing.
   */
  protected composeURI(rawUri: string): string;
  /**
   * Returns a function that maps URI parameters from placeholders.
   * @returns A function used as a replacement callback in `composeURI`.
   * @throws Error if a required parameter is missing.
   */
  protected mapUriParams(): (substring: string, isMandatory: string, paramName: string) => string;
}
//#endregion
//#region src/interfaces/bulk_result.d.ts
interface BulkResult<T = unknown> {
  readonly items: T[];
  readonly errors: {
    message: string;
    code: number;
    [key: string]: unknown;
  }[];
}
//#endregion
//#region src/interfaces/cursor_paginated_result.d.ts
interface CursorPaginatedResult<T = unknown> extends PaginatedResult<T> {
  readonly nextCursor: string | null;
  hasNextCursor(): boolean;
}
//#endregion
//#region src/models/paginated_result.d.ts
declare class PaginatedResult$1<T> implements PaginatedResult {
  totalResults: number;
  totalPages: number;
  resultsPerPage: number;
  currentPage: number;
  responseTooBig: boolean;
  items: T[];
  constructor(items: T[], headers: Headers);
  hasNextPage(): boolean;
  hasPrevPage(): boolean;
  isLastPage(): boolean;
  isFirstPage(): boolean;
  nextPage(): number;
  prevPage(): number;
  private safeParseInt;
}
//#endregion
//#region src/models/cursor_paginated_result.d.ts
declare class CursorPaginatedResult$1<T> extends PaginatedResult$1<T> implements CursorPaginatedResult {
  nextCursor: string | null;
  constructor(items: T[], headers: Headers);
  hasNextCursor(): boolean;
}
//#endregion
//#region src/collections/base_collection.d.ts
type ResolveHandler<T> = (json: Record<string, unknown>, headers: Headers) => T;
type ApiRequestWithResponse = ApiRequest & {
  response: ApiResponse;
};
/**
 * An abstract base class that provides generic CRUD (Create, Read, Update, Delete) operations
 * and handling for pagination, cursor pagination, and bulk operations. Other "collection" classes
 * should extend this class and provide specific implementations for resource endpoints.
 *
 * Expected usage:
 * - Subclasses define `rootElementName` and/or `rootElementNameSingular` to indicate the JSON fields
 *   that contain the desired data.
 * - `elementClass` and optionally `secondaryElementClass` should be overridden to map raw JSON
 *   objects to strongly typed model instances.
 * - `endpoint` and `prefixURI` should be set as static properties in subclasses to specify resource paths.
 */
declare abstract class BaseCollection<ElementType, SecondaryType = ElementType> {
  /**
   * Client data containing authentication and configuration details.
   * Provided by a `BaseClient` or similar client instance.
   */
  readonly clientData: ClientData;
  /**
   * Static endpoint property that subclasses can define to indicate the API endpoint
   * for this collection. If not set, ensure `prefixURI` or `uri` parameters are passed.
   */
  protected static endpoint: string | null;
  /**
   * Static prefixURI property that subclasses can define to indicate a base path.
   * If `uri` is not passed explicitly, this prefix is used to construct the request URL.
   */
  protected static prefixURI: string | null;
  /**
   * Constructs a new BaseCollection instance.
   * @param clientData - Client data for making authenticated requests.
   */
  constructor(clientData: ClientData);
  /**
   * Abstract getter that must be implemented by subclasses.
   * Should return a class constructor that maps a JSON object to an `ElementType` instance.
   */
  protected abstract get elementClass(): new (json: Record<string, unknown>) => ElementType;
  /**
   * Getter that must be overridden by subclasses to return the root element name
   * for array-based JSON responses.
   * @throws Error if not defined by the subclass.
   */
  protected get rootElementName(): string;
  /**
   * Getter that may be overridden by subclasses to return the root element name
   * for single-item JSON responses.
   * @throws Error if not defined by the subclass.
   */
  protected get rootElementNameSingular(): string | null;
  /**
   * Getter that may be overridden by subclasses if a secondary model type is returned.
   * By default, this throws an error. If needed, override it in the subclass.
   */
  protected get secondaryElementClass(): new (json: Record<string, unknown>) => SecondaryType;
  /**
   * Getter that must be overridden if `secondaryElementClass` is used.
   * Returns the JSON property name for the secondary element.
   * @throws Error if not defined by the subclass that uses secondary elements.
   */
  protected get secondaryElementNameSingular(): string;
  /**
   * Perform a GET request that expects a list of items.
   * @param params Optional query or request parameters.
   * @returns A promise resolving to either a paginated result or an array of ElementType.
   */
  protected doList(params: Record<string, unknown>): Promise<PaginatedResult$1<ElementType> | ElementType[]>;
  /**
   * Perform a GET request that expects a cursor-paginated list of items.
   * @param params Optional query or request parameters.
   * @returns A promise resolving to a CursorPaginatedResult of ElementType.
   */
  protected doListCursor(params: Record<string, unknown>): Promise<CursorPaginatedResult$1<ElementType>>;
  /**
   * Perform a GET request to retrieve a single item by its ID.
   * @param id The ID of the item to retrieve.
   * @param params Optional query or request parameters.
   * @returns A promise resolving to a single ElementType instance.
   */
  protected doGet(id: string | number, params?: Record<string, unknown>): Promise<ElementType>;
  /**
   * Perform a DELETE request to remove a single item by its ID.
   * @param id The ID of the item to delete.
   * @param params Optional query or request parameters.
   * @returns A promise resolving to JSON representing the deletion result.
   */
  protected doDelete<T = Record<string, unknown> | Record<string, unknown>[]>(id: string | number, params?: Record<string, unknown>): Promise<T>;
  /**
   * Perform a POST request to create a new resource.
   * @param body The object or array of objects to send in the request body.
   * @param params Optional query or request parameters.
   * @param resolveFn Optional custom resolve handler to parse the response.
   * @returns A promise resolving to an ElementType or SecondaryType instance.
   */
  protected doCreate(body: object | object[] | null, params?: Record<string, unknown>, resolveFn?: (json: Record<string, unknown>, _headers: Headers, secondary?: boolean) => ElementType | SecondaryType): Promise<ElementType | SecondaryType>;
  /**
   * Perform a POST request to create multiple resources at once.
   * @param body The object or array of objects to send in the request body.
   * @param params Optional query or request parameters.
   * @param resolveFn Optional custom resolve handler to parse the response array.
   * @returns A promise resolving to an array of ElementType.
   */
  protected doCreateArray(body: object | object[] | null, params: Record<string, unknown>, resolveFn?: ResolveHandler<ElementType[]>): Promise<ElementType[]>;
  /**
   * Perform an UPDATE (PUT/PATCH) request to modify an existing resource by its ID.
   * @param id The ID of the item to update.
   * @param body The updated fields to send in the request body.
   * @param params Optional query or request parameters.
   * @param resolveFn Optional custom resolve handler to parse the response object.
   * @param method The HTTP method to use, typically PUT or PATCH.
   * @returns A promise resolving to the updated ElementType instance.
   */
  protected doUpdate(id: string | number, body: Record<string, unknown> | null, params: Record<string, unknown>, resolveFn?: (json: Record<string, unknown>, headers: Headers) => ElementType, method?: HttpMethod): Promise<ElementType>;
  /**
   * Parse a JSON response that contains a single item under a known root element name.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   * @returns The parsed ElementType instance.
   * @throws Error if the expected root element name is missing.
   */
  protected populateObjectFromJsonRoot(json: Record<string, unknown>, headers: Headers): ElementType;
  /**
   * Parse a JSON response that contains a secondary item under a known secondary root element name.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   * @returns The parsed SecondaryType instance.
   * @throws Error if the expected secondary element name is missing.
   */
  protected populateSecondaryObjectFromJsonRoot(json: Record<string, unknown>, headers: Headers): SecondaryType;
  /**
   * Parse a JSON response that contains a secondary item.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   * @returns The parsed SecondaryType instance.
   */
  protected populateSecondaryObjectFromJson(json: Record<string, unknown>, headers: Headers): SecondaryType;
  /**
   * Parse a JSON response that contains an array of items along with bulk result details.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   * @returns A BulkResult object containing items and potential errors.
   * @throws Error if the expected root element is missing or not an array.
   */
  protected populateArrayFromJsonBulk(json: Record<string, unknown>, headers: Headers): BulkResult<ElementType>;
  /**
   * Parse a JSON response that contains an array of items.
   * If pagination headers are detected, returns a PaginatedResult.
   * Otherwise, returns a plain array of ElementType.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   */
  protected populateArrayFromJson(json: Record<string, unknown>, headers: Headers): PaginatedResult$1<ElementType> | ElementType[];
  /**
   * Parse a JSON response that contains an array of items.
   * This method returns a plain array and does not consider pagination.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   */
  protected populateArray(json: Record<string, unknown>, headers: Headers): ElementType[];
  /**
   * Parse a JSON response that contains a cursor-paginated array of items.
   * @param json The raw JSON object returned by the API.
   * @param headers The response headers.
   */
  protected populateArrayFromJsonCursor(json: Record<string, unknown>, headers: Headers): CursorPaginatedResult$1<ElementType>;
  /**
   * Parse a JSON object into either an ElementType or a SecondaryType instance.
   * @param json The raw JSON object returned by the API.
   * @param _headers The response headers (if needed).
   * @param secondary If true, use the secondaryElementClass instead of elementClass.
   */
  protected populateObjectFromJson(json: Record<string, unknown>, _headers: Headers, secondary?: boolean): ElementType | SecondaryType;
  /**
   * Return the raw JSON as-is.
   * @param json The raw JSON object or array returned by the API.
   * @param _headers The response headers (if needed).
   */
  protected returnBareJSON<T>(json: unknown, _headers: Headers): T;
  /**
   * Convert a single object into an array if it's not already an array.
   * @param raw_body The raw request body.
   */
  protected objToArray(raw_body: Record<string, unknown> | Record<string, unknown>[]): Record<string, unknown>[];
  /**
   * Create a Promise that sends an HTTP request and resolves with a parsed response.
   * @param method The HTTP method (GET, POST, PUT, DELETE, etc.).
   * @param params Query or request parameters.
   * @param resolveFn A function to resolve and parse the JSON response.
   * @param body The request body, if applicable.
   * @param uri An explicit URI to use for the request. If not provided, prefixURI is used.
   */
  protected createPromise<T>(method: HttpMethod, params: Record<string, unknown>, resolveFn: ResolveHandler<T>, body: object | object[] | null, uri?: string | null): Promise<T>;
  /**
   * Prepare the API request by creating a new ApiRequest instance using the static async factory method.
   * @param method The HTTP method.
   * @param body The request body.
   * @param params The request parameters.
   * @param uri An explicit URI for the request or null.
   */
  protected prepareRequest(method: HttpMethod, body: object | object[] | null, params: Record<string, unknown>, uri: string | null): Promise<ApiRequestWithResponse>;
  /**
   * Determine the URI for the request. If uri is not provided, use prefixURI.
   * @param uri An explicit URI or null.
   * @throws Error if no URI or prefixURI is provided.
   */
  protected getUri(uri: string | null): string;
  protected isResponseTooBig(headers: Headers): boolean;
  /**
   * Determine if the response headers indicate pagination.
   * @param headers The response headers.
   */
  private isPaginated;
  /**
   * Runtime type guard for narrowing `unknown` to `Record<string, unknown>`.
   *
   * @param value The value to test.
   */
  private isRecord;
}
//#endregion
//#region src/collections/branches.d.ts
declare class Branches extends BaseCollection<Branch$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Branch$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: ProjectWithPagination): Promise<PaginatedResult<Branch$1>>;
  create(branch_params: BranchParams, request_params: ProjectOnly): Promise<Branch$1>;
  get(branch_id: string | number, request_params: ProjectOnly): Promise<Branch$1>;
  update(branch_id: string | number, branch_params: BranchParams, request_params: ProjectOnly): Promise<Branch$1>;
  delete(branch_id: string | number, request_params: ProjectOnly): Promise<BranchDeleted>;
  merge(branch_id: string | number, request_params: ProjectOnly, body?: MergeBranchParams): Promise<BranchMerged>;
}
//#endregion
//#region src/interfaces/comment.d.ts
interface Comment {
  comment_id: number;
  key_id: number;
  comment: string;
  added_by: number;
  added_by_email: string;
  added_at: string;
  added_at_timestamp: number;
}
//#endregion
//#region src/models/comment.d.ts
declare class Comment$1 extends BaseModel implements Comment {
  comment_id: number;
  key_id: number;
  comment: string;
  added_by: number;
  added_by_email: string;
  added_at: string;
  added_at_timestamp: number;
}
//#endregion
//#region src/types/comments.d.ts
type CommentData = {
  comment?: string;
};
type CommentDeleted = {
  project_id: string;
  comment_deleted: boolean;
  branch?: string;
};
type ProjectAndKey = ProjectOnly & {
  key_id: number | string;
};
type KeyProjectPagination = ProjectWithPagination & {
  key_id: number | string;
};
//#endregion
//#region src/collections/comments.d.ts
declare class Comments extends BaseCollection<Comment$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Comment$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: KeyProjectPagination): Promise<PaginatedResult<Comment$1>>;
  create(comment_params: CommentData | CommentData[], request_params: ProjectAndKey): Promise<Comment$1[]>;
  get(comment_id: string | number, request_params: ProjectAndKey): Promise<Comment$1>;
  delete(comment_id: string | number, request_params: ProjectAndKey): Promise<CommentDeleted>;
  list_project_comments(params: ProjectWithPagination): Promise<PaginatedResult<Comment$1>>;
}
//#endregion
//#region src/interfaces/contributor.d.ts
interface Contributor {
  user_id: number;
  email: string;
  fullname: string;
  created_at: string;
  created_at_timestamp: number;
  is_admin: boolean;
  is_reviewer: boolean;
  languages: Array<{
    lang_id: number;
    lang_iso: string;
    lang_name: string;
    is_writable: boolean;
  }>;
  admin_rights: string[];
  role_id: number;
  uuid?: string;
}
//#endregion
//#region src/models/contributor.d.ts
declare class Contributor$1 extends BaseModel implements Contributor {
  user_id: number;
  email: string;
  fullname: string;
  created_at: string;
  created_at_timestamp: number;
  is_admin: boolean;
  is_reviewer: boolean;
  languages: Array<{
    lang_id: number;
    lang_iso: string;
    lang_name: string;
    is_writable: boolean;
  }>;
  admin_rights: string[];
  role_id: number;
  uuid?: string;
}
//#endregion
//#region src/types/contributor_rights.d.ts
type ContributorRights = "activity" | "branches_create" | "branches_main_modify" | "branches_merge" | "contributors" | "custom_status_modify" | "download" | "glossary" | "glossary_delete" | "glossary_edit" | "keys" | "manage_languages" | "review" | "screenshots" | "settings" | "statistics" | "tasks" | "upload";
//#endregion
//#region src/types/contributor_roles.d.ts
type ContributorRoles = 1 | 2 | 3 | 4 | 5;
//#endregion
//#region src/types/contributors.d.ts
type ContributorLanguages = {
  lang_iso: string;
  is_writable?: boolean;
};
type ContributorCreateData = {
  email: string;
  fullname?: string;
  is_admin?: boolean;
  is_reviewer?: boolean;
  role_id?: ContributorRoles;
  languages: ContributorLanguages[];
  admin_rights?: ContributorRights[];
};
type ContributorUpdateData = {
  is_admin?: boolean;
  is_reviewer?: boolean;
  role_id?: ContributorRoles;
  languages?: ContributorLanguages[];
  admin_rights?: ContributorRights[];
};
type ContributorDeleted = {
  project_id: string;
  contributor_deleted: boolean;
  branch?: string;
};
//#endregion
//#region src/collections/contributors.d.ts
declare class Contributors extends BaseCollection<Contributor$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Contributor$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: ProjectWithPagination): Promise<PaginatedResult<Contributor$1>>;
  create(contributor_params: ContributorCreateData | ContributorCreateData[], request_params: ProjectOnly): Promise<Contributor$1[]>;
  get(contributor_id: string | number, request_params: ProjectOnly): Promise<Contributor$1>;
  me(request_params: ProjectOnly): Promise<Contributor$1>;
  update(contributor_id: string | number, contributor_params: ContributorUpdateData, request_params: ProjectOnly): Promise<Contributor$1>;
  delete(contributor_id: string | number, request_params: ProjectOnly): Promise<ContributorDeleted>;
}
//#endregion
//#region src/interfaces/file.d.ts
interface File {
  file_id: number;
  filename: string;
  key_count: number;
}
//#endregion
//#region src/models/file.d.ts
declare class File$1 extends BaseModel implements File {
  file_id: number;
  filename: string;
  key_count: number;
}
//#endregion
//#region src/types/queued_process_details.d.ts
type UploadedFileProcessDetails = {
  files: {
    status: string;
    message: string;
    name_original: string;
    name_custom?: string;
    word_count_total: number;
    key_count_total: number;
    key_count_inserted: number;
    key_count_updated: number;
    key_count_skipped: number;
  }[];
};
type DownloadedFileProcessDetails = {
  download_url: string;
  file_size_kb: number;
  total_number_of_keys: number;
};
type QueuedProcessDetails = UploadedFileProcessDetails | DownloadedFileProcessDetails;
//#endregion
//#region src/interfaces/queued_process.d.ts
interface QueuedProcess {
  process_id: string;
  type: string;
  status: string;
  message: string;
  created_by: number;
  created_by_email: string;
  created_at: string;
  created_at_timestamp: number;
  details: QueuedProcessDetails;
}
//#endregion
//#region src/models/queued_process.d.ts
declare class QueuedProcess$1 extends BaseModel implements QueuedProcess {
  process_id: string;
  type: string;
  status: string;
  message: string;
  created_by: number;
  created_by_email: string;
  created_at: string;
  created_at_timestamp: number;
  details: QueuedProcessDetails;
}
//#endregion
//#region src/types/file_format.d.ts
type FileFormat = "android_sdk" | "arb" | "csv" | "docx" | "flutter_sdk" | "html" | "ini" | "ios_sdk" | "js" | "json" | "json_structured" | "offline_xliff" | "php_array" | "php_laravel" | "plist" | "po" | "properties" | "react_native" | "resx" | "ruby_yaml" | "stf" | "strings" | "symfony_xliff" | "ts" | "xlf" | "xliff" | "xlsx" | "xml" | "yaml";
//#endregion
//#region src/types/files.d.ts
type DownloadBundle = {
  project_id: string;
  bundle_url: string;
  branch?: string;
  responseTooBig?: boolean;
};
type FileDeleted = {
  project_id: string;
  file_deleted: boolean;
};
type LanguageMapping = {
  original_language_iso: string;
  custom_language_iso: string;
};
type FilterData = "translated" | "untranslated" | "reviewed" | "reviewed_only" | "last_reviewed_only" | "verified" | "nonhidden";
type ExportSort = "first_added" | "last_added" | "last_updated" | "a_z" | "z_a";
type ExportEmptyAs = "empty" | "base" | "null" | "skip";
type ExportNullAs = "null" | "empty";
type Trigger = "amazons3" | "gcs" | "github" | "github-enterprise" | "gitlab" | "bitbucket" | "bitbucket-enterprise" | "azure";
type PluralFormat = "json_string" | "icu" | "array" | "generic" | "symfony" | "i18next" | "i18next_v4";
type PlaceholderFormat = "printf" | "ios" | "icu" | "net" | "symfony" | "i18n" | "raw";
type Indentation = "default" | "1sp" | "2sp" | "3sp" | "4sp" | "5sp" | "6sp" | "7sp" | "8sp" | "tab";
type JavaPropertiesEncoding = "utf-8" | "latin-1";
interface DownloadFileParams {
  format: FileFormat;
  original_filenames?: boolean;
  bundle_structure?: string;
  directory_prefix?: string;
  all_platforms?: boolean;
  filter_langs?: string[];
  filter_data?: FilterData[];
  filter_filenames?: string[];
  add_newline_eof?: boolean;
  custom_translation_status_ids?: string[] | number[];
  include_tags?: string[];
  exclude_tags?: string[];
  export_sort?: ExportSort;
  export_empty_as?: ExportEmptyAs;
  export_null_as?: ExportNullAs;
  include_comments?: boolean;
  include_description?: boolean;
  include_pids?: string[];
  triggers?: Trigger[];
  filter_repositories?: string[];
  replace_breaks?: boolean;
  disable_references?: boolean;
  plural_format?: PluralFormat;
  placeholder_format?: PlaceholderFormat;
  webhook_url?: string;
  language_mapping?: LanguageMapping[];
  icu_numeric?: boolean;
  escape_percent?: boolean;
  indentation?: Indentation;
  yaml_include_root?: boolean;
  json_unescaped_slashes?: boolean;
  java_properties_encoding?: JavaPropertiesEncoding;
  java_properties_separator?: "=" | ":";
  bundle_description?: string;
  filter_task_id?: number;
  compact?: boolean;
}
interface UploadFileParams {
  data: string;
  filename: string;
  lang_iso: string;
  convert_placeholders?: boolean;
  detect_icu_plurals?: boolean;
  tags?: string[];
  tag_inserted_keys?: boolean;
  tag_updated_keys?: boolean;
  tag_skipped_keys?: boolean;
  replace_modified?: boolean;
  slashn_to_linebreak?: boolean;
  keys_to_values?: boolean;
  distinguish_by_file?: boolean;
  apply_tm?: boolean;
  use_automations?: boolean;
  hidden_from_contributors?: boolean;
  cleanup_mode?: boolean;
  custom_translation_status_ids?: string[] | number[];
  custom_translation_status_inserted_keys?: boolean;
  custom_translation_status_updated_keys?: boolean;
  custom_translation_status_skipped_keys?: boolean;
  skip_detect_lang_iso?: boolean;
  format?: FileFormat;
  filter_task_id?: number;
}
type ListFileParams = ProjectWithPagination & {
  filter_filename?: string;
};
//#endregion
//#region src/collections/files.d.ts
declare class Files extends BaseCollection<File$1, QueuedProcess$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => File$1;
  protected get rootElementName(): string;
  protected get secondaryElementClass(): new (json: Record<string, unknown>) => QueuedProcess$1;
  protected get secondaryElementNameSingular(): string;
  protected returnBareJSON<T>(json: Record<string, unknown> | Record<string, unknown>[], headers: Headers): T;
  list(request_params: ListFileParams): Promise<PaginatedResult<File$1>>;
  upload(project_id: string, upload: UploadFileParams): Promise<QueuedProcess$1>;
  download(project_id: string, download: DownloadFileParams): Promise<DownloadBundle>;
  async_download(project_id: string, download: DownloadFileParams): Promise<QueuedProcess$1>;
  delete(file_id: string | number, request_params: ProjectOnly): Promise<FileDeleted>;
}
//#endregion
//#region src/interfaces/glossary_term.d.ts
interface GlossaryTerm {
  id: number;
  projectId: string;
  term: string;
  description: string;
  caseSensitive: boolean;
  translatable: boolean;
  forbidden: boolean;
  translations: Array<{
    langId: number;
    langName: string;
    langIso: string;
    translation: string;
    description: string;
  }>;
  tags: string[];
  createdAt: string;
  updatedAt: string | null;
}
//#endregion
//#region src/models/glossary_term.d.ts
declare class GlossaryTerm$1 extends BaseModel implements GlossaryTerm {
  id: number;
  projectId: string;
  term: string;
  description: string;
  caseSensitive: boolean;
  translatable: boolean;
  forbidden: boolean;
  translations: Array<{
    langId: number;
    langName: string;
    langIso: string;
    translation: string;
    description: string;
  }>;
  tags: string[];
  createdAt: string;
  updatedAt: string | null;
}
//#endregion
//#region src/types/glossary_terms.d.ts
type ListTermsParams = ProjectOnly & Omit<CursorPagination, "pagination">;
type CreateTermsParams = {
  terms: Array<{
    term: string;
    description: string;
    caseSensitive: boolean;
    translatable: boolean;
    forbidden: boolean;
    translations?: Array<{
      langId?: number;
      translation?: string;
      description?: string;
    }>;
    tags?: string[];
  }>;
};
type UpdateTermsParams = {
  terms: Array<{
    id: number;
    term?: string;
    description?: string;
    caseSensitive?: boolean;
    translatable?: boolean;
    forbidden?: boolean;
    translations?: Array<{
      langId?: number;
      translation?: string;
      description?: string;
    }>;
    tags?: string[];
  }>;
};
type TermsDeleted = {
  deleted: {
    count: number;
    ids: number[];
  };
  failed: Array<{
    count: number;
    ids: number[];
    message: string;
  }>;
};
//#endregion
//#region src/collections/glossary_terms.d.ts
declare class GlossaryTerms extends BaseCollection<GlossaryTerm$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => GlossaryTerm$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  get(term_id: string | number, request_params: ProjectOnly): Promise<GlossaryTerm$1>;
  list(request_params: ListTermsParams): Promise<CursorPaginatedResult<GlossaryTerm$1>>;
  create(term_params: CreateTermsParams, request_params: ProjectOnly): Promise<BulkResult<GlossaryTerm$1>>;
  update(term_params: UpdateTermsParams, request_params: ProjectOnly): Promise<BulkResult<GlossaryTerm$1>>;
  delete(term_ids: number[], request_params: ProjectOnly): Promise<TermsDeleted>;
  private populateFromBulkDelete;
}
//#endregion
//#region src/interfaces/jwt.d.ts
interface Jwt {
  jwt: string;
}
//#endregion
//#region src/models/jwt.d.ts
declare class Jwt$2 extends BaseModel implements Jwt {
  jwt: string;
}
//#endregion
//#region src/collections/jwt.d.ts
declare class Jwt$1 extends BaseCollection<Jwt$2> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Jwt$2;
  create(project_id: string, body?: {
    service: string;
  }): Promise<Jwt$2>;
}
//#endregion
//#region src/interfaces/screenshot.d.ts
interface Screenshot {
  screenshot_id: number;
  key_ids: number[];
  keys: Array<{
    key_id: number;
    coordinates: {
      left: number;
      top: number;
      width: number;
      height: number;
    };
  }>;
  url: string;
  title: string;
  description: string;
  screenshot_tags: string[];
  width: number;
  height: number;
  created_at: string;
  created_at_timestamp: number;
}
//#endregion
//#region src/interfaces/translation_status.d.ts
interface TranslationStatus {
  status_id: number;
  title: string;
  color: string;
}
//#endregion
//#region src/interfaces/translation.d.ts
interface Translation {
  translation_id: number;
  key_id: number;
  language_iso: string;
  modified_at: string;
  modified_at_timestamp: number;
  modified_by: number;
  modified_by_email: string;
  translation: string;
  is_unverified: boolean;
  is_reviewed: boolean;
  is_fuzzy: boolean;
  reviewed_by: number;
  words: number;
  custom_translation_statuses: TranslationStatus[];
  task_id: number;
  segment_number: number;
}
//#endregion
//#region src/types/filenames.d.ts
type Filenames = {
  ios?: string | null;
  android?: string | null;
  web?: string | null;
  other?: string | null;
};
//#endregion
//#region src/types/supported_platforms.d.ts
type SupportedPlatforms = "ios" | "android" | "web" | "other";
//#endregion
//#region src/interfaces/key.d.ts
type KeyComment$1 = Omit<Comment, "key_id">;
interface Key {
  key_id: number;
  created_at: string;
  created_at_timestamp: number;
  key_name: Filenames;
  filenames: Filenames;
  description: string;
  platforms: SupportedPlatforms[];
  tags: string[];
  comments: KeyComment$1[];
  screenshots: Screenshot[];
  translations: Translation[];
  is_plural: boolean;
  plural_name: string;
  is_hidden: boolean;
  is_archived: boolean;
  context: string;
  base_words: number;
  char_limit: number;
  custom_attributes: string;
  modified_at: string;
  modified_at_timestamp: number;
  translations_modified_at: string;
  translations_modified_at_timestamp: number;
}
//#endregion
//#region src/models/key.d.ts
type KeyComment = Omit<Comment, "key_id">;
declare class Key$1 extends BaseModel implements Key {
  key_id: number;
  created_at: string;
  created_at_timestamp: number;
  key_name: Filenames;
  filenames: Filenames;
  description: string;
  platforms: SupportedPlatforms[];
  tags: string[];
  comments: KeyComment[];
  screenshots: Screenshot[];
  translations: Translation[];
  is_plural: boolean;
  plural_name: string;
  is_hidden: boolean;
  is_archived: boolean;
  context: string;
  base_words: number;
  char_limit: number;
  custom_attributes: string;
  modified_at: string;
  modified_at_timestamp: number;
  translations_modified_at: string;
  translations_modified_at_timestamp: number;
}
//#endregion
//#region src/types/numeric_bool.d.ts
type NumericBool = 0 | 1;
//#endregion
//#region src/types/screenshots.d.ts
type CreateScreenshotParams = {
  data: string;
  title?: string;
  description?: string;
  ocr?: boolean;
  key_ids?: string[] | number[];
  tags?: string[];
};
type UpdateScreenshotParams = Omit<CreateScreenshotParams, "data" | "ocr">;
type ScreenshotDeleted = {
  project_id: string;
  screenshot_deleted: boolean;
  branch?: string;
};
type ScreenshotData = {
  title?: string;
  description?: string;
  screenshot_tags?: string[];
  data?: string;
};
//#endregion
//#region src/types/translations.d.ts
type TranslationData = {
  language_iso?: string;
  translation?: string | Record<string, unknown>;
  is_reviewed?: boolean;
  is_unverified?: boolean;
  custom_translation_status_ids?: string[] | number[];
};
type UpdateTranslationParams = {
  translation: string;
  is_unverified?: boolean;
  is_reviewed?: boolean;
  custom_translation_status_ids?: string[] | number[];
};
type ListTranslationParams = ProjectWithPagination & CursorPagination & {
  disable_references?: number | string;
  filter_lang_id?: number | string;
  filter_is_reviewed?: number | string;
  filter_unverified?: number | string;
  filter_untranslated?: number | string;
  filter_qa_issues?: string;
  filter_active_task_id?: number | string;
};
type GetTranslationParams = ProjectOnly & {
  disable_references?: number | string;
};
//#endregion
//#region src/types/keys.d.ts
type CreateKeyData = {
  key_name: string | Filenames;
  description?: string;
  platforms: SupportedPlatforms[];
  filenames?: Filenames;
  tags?: string[];
  comments?: CommentData[];
  screenshots?: ScreenshotData[];
  translations?: TranslationData[];
  is_plural?: boolean;
  plural_name?: string;
  is_hidden?: boolean;
  is_archived?: boolean;
  context?: string;
  char_limit?: number;
  custom_attributes?: string;
};
type CreateKeyParams = {
  keys?: CreateKeyData[];
  use_automations?: boolean;
};
type UpdateKeyData = Omit<CreateKeyData, "key_name" | "platforms" | "translations"> & {
  key_name?: string | Filenames;
  merge_tags?: boolean;
  platforms?: SupportedPlatforms[];
};
type BulkUpdateKeyParams = {
  keys?: UpdateKeyDataWithId[];
  use_automations?: boolean;
};
type UpdateKeyDataWithId = UpdateKeyData & {
  key_id: string | number;
  translations?: TranslationData[];
};
type KeyDeleted = {
  project_id: string;
  key_removed: boolean;
  keys_locked?: number;
  branch?: string;
};
type KeysBulkDeleted = {
  project_id: string;
  keys_removed: boolean;
  keys_locked: number;
  branch?: string;
};
type KeyParamsWithPagination = ProjectWithPagination & CursorPagination & {
  disable_references?: NumericBool;
  include_comments?: NumericBool;
  include_screenshots?: NumericBool;
  include_translations?: NumericBool;
  filter_translation_lang_ids?: string;
  filter_tags?: string;
  filter_filenames?: string;
  filter_keys?: string;
  filter_key_ids?: string;
  filter_platforms?: string;
  filter_untranslated?: NumericBool;
  filter_qa_issues?: string;
  filter_archived?: string;
};
type GetKeyParams = ProjectOnly & {
  disable_references?: NumericBool;
};
//#endregion
//#region src/collections/keys.d.ts
declare class Keys extends BaseCollection<Key$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Key$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: KeyParamsWithPagination): Promise<CursorPaginatedResult<Key$1>>;
  create(key_params: CreateKeyParams, request_params: ProjectOnly): Promise<BulkResult<Key$1>>;
  get(key_id: string | number, request_params: GetKeyParams): Promise<Key$1>;
  update(key_id: string | number, key_params: UpdateKeyData, request_params: ProjectOnly): Promise<Key$1>;
  delete(key_id: string | number, request_params: ProjectOnly): Promise<KeyDeleted>;
  bulk_update(key_params: BulkUpdateKeyParams, request_params: ProjectOnly): Promise<BulkResult<Key$1>>;
  bulk_delete(key_ids: number[] | string[], request_params: ProjectOnly): Promise<KeysBulkDeleted>;
}
//#endregion
//#region src/interfaces/language.d.ts
interface Language {
  lang_id: number;
  lang_iso: string;
  lang_name: string;
  is_rtl: boolean;
  plural_forms: string[];
  project_language_uuid?: string;
}
//#endregion
//#region src/models/language.d.ts
declare class Language$1 extends BaseModel implements Language {
  lang_id: number;
  lang_iso: string;
  lang_name: string;
  is_rtl: boolean;
  plural_forms: string[];
  project_language_uuid?: string;
}
//#endregion
//#region src/types/languages.d.ts
type CreateLanguageParams = {
  lang_iso: string;
  custom_iso?: string;
  custom_name?: string;
  custom_plural_forms?: string[];
};
type UpdateLanguageParams = {
  lang_iso?: string;
  lang_name?: string;
  plural_forms?: string[];
};
type LanguageDeleted = {
  project_id: string;
  language_deleted: boolean;
  branch?: string;
};
//#endregion
//#region src/collections/languages.d.ts
declare class Languages extends BaseCollection<Language$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Language$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  system_languages(params?: PaginationParams): Promise<PaginatedResult<Language$1>>;
  list(request_params: ProjectWithPagination): Promise<PaginatedResult<Language$1>>;
  create(raw_body: CreateLanguageParams | CreateLanguageParams[], request_params: ProjectOnly): Promise<BulkResult<Language$1>>;
  get(lang_id: string | number, request_params: ProjectOnly): Promise<Language$1>;
  update(lang_id: string | number, lang_params: UpdateLanguageParams, request_params: ProjectOnly): Promise<Language$1>;
  delete(lang_id: string | number, request_params: ProjectOnly): Promise<LanguageDeleted>;
}
//#endregion
//#region src/interfaces/order.d.ts
interface Order {
  order_id: string;
  project_id: string;
  branch: string;
  payment_method: string | null;
  card_id: number | string;
  status: string;
  created_at: string;
  created_at_timestamp: number;
  created_by: number;
  created_by_email: string;
  source_language_iso: string;
  target_language_isos: string[];
  keys: number[] | string[];
  source_words: Record<string, unknown>;
  provider_slug: string;
  translation_style: string;
  translation_tier: number;
  translation_tier_name: string;
  briefing: string;
  is_saved_to_translation_memory: boolean;
  total: number;
  dry_run: boolean;
}
//#endregion
//#region src/models/order.d.ts
declare class Order$1 extends BaseModel implements Order {
  order_id: string;
  project_id: string;
  branch: string;
  card_id: number | string;
  status: string;
  created_at: string;
  created_at_timestamp: number;
  created_by: number;
  created_by_email: string;
  source_language_iso: string;
  target_language_isos: string[];
  keys: number[] | string[];
  source_words: Record<string, unknown>;
  provider_slug: string;
  translation_style: string;
  translation_tier: number;
  translation_tier_name: string;
  briefing: string;
  total: number;
  payment_method: string | null;
  is_saved_to_translation_memory: boolean;
  dry_run: boolean;
}
//#endregion
//#region src/types/orders.d.ts
type CreateOrderParams = {
  project_id: string;
  branch?: string;
  payment_method?: "credit_card" | "team_credit";
  card_id?: number | string;
  briefing: string;
  source_language_iso: string;
  target_language_isos: string[];
  keys: string[] | number[];
  provider_slug: string;
  translation_tier: number | string;
  is_saved_to_translation_memory?: boolean;
  dry_run?: boolean;
  translation_style?: "formal" | "informal" | "business" | "friendly";
};
//#endregion
//#region src/types/teams.d.ts
type TeamWithPagination = TeamOnly & PaginationParams;
//#endregion
//#region src/collections/orders.d.ts
declare class Orders extends BaseCollection<Order$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Order$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: TeamWithPagination): Promise<PaginatedResult<Order$1>>;
  create(order_params: CreateOrderParams, request_params: TeamOnly): Promise<Order$1>;
  get(order_id: string | number, request_params: TeamOnly): Promise<Order$1>;
}
//#endregion
//#region src/interfaces/payment_card.d.ts
interface PaymentCard {
  card_id: number;
  last4: string;
  brand: string;
  created_at: string;
  created_at_timestamp: number;
}
//#endregion
//#region src/models/payment_card.d.ts
declare class PaymentCard$1 extends BaseModel implements PaymentCard {
  card_id: number;
  last4: string;
  brand: string;
  created_at: string;
  created_at_timestamp: number;
}
//#endregion
//#region src/types/cards.d.ts
type CreateCardParams = {
  number: string;
  cvc: string | number;
  exp_month: string | number;
  exp_year: string | number;
};
type CardDeleted = {
  card_id: string;
  card_deleted: boolean;
};
//#endregion
//#region src/collections/payment_cards.d.ts
declare class PaymentCards extends BaseCollection<PaymentCard$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => PaymentCard$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params?: PaginationParams): Promise<PaginatedResult<PaymentCard$1>>;
  create(card_params: CreateCardParams): Promise<PaymentCard$1>;
  get(card_id: string | number): Promise<PaymentCard$1>;
  delete(card_id: string | number): Promise<CardDeleted>;
}
//#endregion
//#region src/interfaces/auth_data.d.ts
interface AuthData {
  client_id: string;
  client_secret: string;
  host?: string;
  version?: string;
}
//#endregion
//#region src/interfaces/auth_error.d.ts
interface IAuthError {
  code: number;
  error: string;
  error_description: string;
  error_uri?: string;
}
//#endregion
//#region src/interfaces/client_params.d.ts
/**
 * Parameters used to configure a BaseClient instance.
 */
type ClientParams = {
  /**
   * The API key for authenticating requests. This must be provided.
   */
  apiKey?: string;
  /**
   * Header for auth requests, if nothing is set default one will be used.
   */
  header?: string;
  /**
   * Whether to enable response compression (e.g., gzip).
   * Defaults to `false` if not specified.
   */
  enableCompression?: boolean;
  /**
   * The type of token used for authentication, e.g. "Bearer".
   * If omitted, the token will be used as-is.
   */
  tokenType?: string;
  /**
   * The base host URL for requests. If not provided, a default may be used downstream.
   */
  host?: string;
  /**
   * API version. Defaults to "api2" if not specified elsewhere.
   */
  version?: string;
  /**
   * Request timeout in milliseconds. If not provided, requests have no explicit timeout.
   */
  requestTimeout?: number;
  /**
   * Silent mode (supress all warning/error messages). Defaults to false.
   */
  silent?: boolean;
  /**
   * Custom User-Agent header value. If not provided, defaults to `node-lokalise-api/{version}`.
   */
  userAgent?: string;
};
//#endregion
//#region src/interfaces/ota/ota_bundle.d.ts
interface OtaBundle {
  id: number;
  projectId: string;
  isPrerelease: boolean;
  isProduction: boolean;
  createdAt: string;
  createdBy: string;
  framework: string;
  description: string;
  isFrozen: boolean;
  lokaliseId: number;
  fileId: string;
  fileUrl: string;
  modifiedAt: string;
}
//#endregion
//#region src/interfaces/ota/ota_bundle_archive.d.ts
interface OtaBundleArchive {
  url: string;
  version: number;
}
//#endregion
//#region src/interfaces/ota/ota_freeze_period.d.ts
interface OtaFreezePeriod {
  id: number;
  projectId: number;
  bundleId: number;
  framework: string;
  from: string;
  to: string;
}
//#endregion
//#region src/interfaces/ota/ota_sdk_token.d.ts
interface OtaSdkToken {
  id: number;
  token: string;
  projectId: number;
  lokaliseId: number;
  createdAt: string;
}
//#endregion
//#region src/interfaces/ota/ota_statistics.d.ts
interface OtaStatistics {
  lokaliseProjectId: string;
  from: string;
  to: string;
  sdk: string;
  daily: Array<{
    date: string;
    downloads: number;
    trafficMb: number;
    trafficBytes: string;
    framework: string;
  }>;
  monthly: Array<{
    date: string;
    downloads: number;
    trafficMb: number;
    trafficBytes: string;
    framework: string;
  }>;
  totals: {
    downloads: number;
    trafficMb: number;
    trafficBytes: string;
  };
}
//#endregion
//#region src/interfaces/project_settings.d.ts
interface ProjectSettings {
  per_platform_key_names: boolean;
  reviewing: boolean;
  auto_toggle_unverified: boolean;
  offline_translation: boolean;
  key_editing: boolean;
  inline_machine_translations: boolean;
  branching: boolean;
  segmentation: boolean;
  custom_translation_statuses: boolean;
  custom_translation_statuses_allow_multiple: boolean;
}
//#endregion
//#region src/interfaces/project_statistics.d.ts
interface ProjectStatistics {
  progress_total: number;
  keys_total: number;
  team: number;
  base_words: number;
  qa_issues_total: number;
  qa_issues: {
    not_reviewed: number;
    unverified: number;
    spelling_grammar: number;
    inconsistent_placeholders: number;
    inconsistent_html: number;
    different_number_of_urls: number;
    different_urls: number;
    leading_whitespace: number;
    trailing_whitespace: number;
    different_number_of_email_address: number;
    different_email_address: number;
    different_brackets: number;
    different_numbers: number;
    double_space: number;
    special_placeholder: number;
    unbalanced_brackets: number;
  };
  languages: Array<{
    language_id: number;
    language_iso: string;
    progress: number;
    words_to_do: number;
  }>;
}
//#endregion
//#region src/interfaces/project.d.ts
interface Project {
  project_id: string;
  project_type: string;
  uuid?: string;
  name: string;
  description: string;
  created_at: string;
  created_at_timestamp: number;
  created_by: number;
  created_by_email: string;
  team_id: number;
  team_uuid: string;
  base_language_id: number;
  base_language_iso: string;
  settings: ProjectSettings;
  statistics: ProjectStatistics;
}
//#endregion
//#region src/interfaces/refresh_token_response.d.ts
interface RefreshTokenResponse {
  access_token: string;
  scope: string;
  expires_in: string | number;
  token_type: string;
}
//#endregion
//#region src/interfaces/request_token_response.d.ts
interface RequestTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: string | number;
  token_type: string;
}
//#endregion
//#region src/interfaces/segment.d.ts
interface Segment {
  segment_number: number;
  language_iso: string;
  modified_at: string;
  modified_at_timestamp: number;
  modified_by: number;
  modified_by_email: string;
  value: string;
  is_fuzzy: boolean;
  is_reviewed: boolean;
  reviewed_by: number;
  words: number;
  custom_translation_statuses: TranslationStatus[];
}
//#endregion
//#region src/interfaces/snapshot.d.ts
interface Snapshot {
  snapshot_id: number;
  title: string;
  created_at: string;
  created_at_timestamp: number;
  created_by: number;
  created_by_email: string;
}
//#endregion
//#region src/interfaces/task.d.ts
interface Task {
  task_id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
  due_date: string;
  due_date_timestamp: number;
  keys_count: number;
  words_count: number;
  created_at: string;
  created_at_timestamp: number;
  created_by: number;
  created_by_email: string;
  can_be_parent: boolean;
  task_type: string;
  parent_task_id: number;
  closing_tags: string[];
  do_lock_translations: boolean;
  languages: Array<{
    language_iso: string;
    users: Array<{
      user_id: string | number;
      email: string;
      fullname: string;
    }>;
    groups: Array<{
      id: string | number;
      name: string;
    }>;
    keys: string[] | number[];
    status: string;
    progress: number;
    initial_tm_leverage: {
      "0%+": number;
      "60%+": number;
      "75%+": number;
      "95%+": number;
      "100%": number;
    };
    tm_leverage: {
      status: string;
      value: {
        "0%+": number;
        "50%+": number;
        "75%+": number;
        "85%+": number;
        "95%+": number;
        "100%": number;
      };
    };
    keys_count: number;
    words_count: number;
    completed_at: string;
    completed_at_timestamp: number;
    completed_by: number;
    completed_by_email: string;
  }>;
  source_language_iso: string;
  auto_close_languages: boolean;
  auto_close_task: boolean;
  auto_close_items: boolean;
  completed_at: string;
  completed_at_timestamp: number;
  completed_by: number;
  completed_by_email: string;
  custom_translation_status_ids: number[];
}
//#endregion
//#region src/interfaces/team.d.ts
interface Team {
  team_id: number;
  name: string;
  created_at: string;
  created_at_timestamp: number;
  plan: string;
  quota_usage: {
    users: number;
    keys: number;
    projects: number;
    mau: number;
    ai_words: number;
  };
  quota_allowed: {
    users: number;
    keys: number;
    projects: number;
    mau: number;
    ai_words: number;
  };
}
//#endregion
//#region src/interfaces/team_user.d.ts
interface TeamUser {
  user_id: number;
  email: string;
  fullname: string;
  created_at: string;
  created_at_timestamp: number;
  role: string;
  uuid?: string;
}
//#endregion
//#region src/interfaces/team_user_billing_details.d.ts
interface TeamUserBillingDetails {
  billing_email: string;
  country_code: string;
  zip: string;
  state_code: string;
  address1: string;
  address2: string;
  city: string;
  phone: string;
  company: string;
  vatnumber: string;
}
//#endregion
//#region src/interfaces/translation_provider.d.ts
interface TranslationProvider {
  provider_id: number;
  name: string;
  slug: string;
  price_pair_min: number;
  website_url: string;
  description: string;
  tiers: Array<{
    tier_id: number;
    title: string;
  }>;
  pairs: Array<{
    tier_id: number;
    from_lang_iso: string;
    from_lang_name: string;
    to_lang_iso: string;
    to_lang_name: string;
    price_per_word: number;
  }>;
}
//#endregion
//#region src/interfaces/user_group.d.ts
interface UserGroup {
  group_id: number;
  name: string;
  permissions: {
    is_admin: boolean;
    is_reviewer: boolean;
    admin_rights: string[];
    languages: Array<{
      lang_id: number;
      lang_iso: string;
      lang_name: string;
      is_writable: boolean;
    }>;
  };
  created_at: string;
  created_at_timestamp: number;
  team_id: number;
  projects: string[] | number[];
  members: number[] | string[];
  role_id: number | null;
}
//#endregion
//#region src/interfaces/webhook.d.ts
interface Webhook {
  webhook_id: string;
  url: string;
  branch: string;
  secret: string;
  events: string[];
  event_lang_map: Array<{
    event: string;
    lang_iso_codes: string[];
  }>;
}
//#endregion
//#region src/interfaces/permission_template.d.ts
interface PermissionTemplate$1 {
  id: number;
  role: string;
  permissions: string[];
  description: string;
  tag: string;
  tagColor: string;
  tagInfo: string | null;
  doesEnableAllReadOnlyLanguages: boolean;
}
//#endregion
//#region src/models/permission_template.d.ts
declare class PermissionTemplate extends BaseModel implements PermissionTemplate$1 {
  id: number;
  role: string;
  permissions: string[];
  description: string;
  tag: string;
  tagColor: string;
  tagInfo: string | null;
  doesEnableAllReadOnlyLanguages: boolean;
}
//#endregion
//#region src/types/billing_details.d.ts
type BillingDetailsParams = {
  billing_email: string;
  country_code: string;
  zip: string;
  state_code?: string;
  address1?: string;
  address2?: string;
  city?: string;
  phone?: string;
  company?: string;
  vatnumber?: string;
};
//#endregion
//#region src/types/ota.d.ts
type OtaResourceDeleted = {
  id: number;
  deleted: boolean;
};
type OtaTeamProject = {
  teamId: number | string;
  lokaliseProjectId: string;
};
type OtaFramework = {
  framework: "ios_sdk" | "android_sdk" | "flutter_sdk";
};
type OtaTeamProjectFramework = OtaTeamProject & OtaFramework;
type OtaProjectFramework = OtaFramework & {
  lokaliseProjectId: string;
};
type OtaFreezePeriodParams = {
  from: string;
  to: string;
  bundleId: number | string;
};
type OtaUsageParams = {
  dateFrom: string;
  dateTo: string;
  framework?: string;
};
type OtaBundleUpdateData = {
  description: string;
};
type OtaRequestBundleParams = {
  appVersion: string;
  transVersion: number;
  prerelease?: boolean;
};
//#endregion
//#region src/types/projects.d.ts
type CreateProjectParams = {
  name: string;
  team_id?: number | string;
  description?: string;
  languages?: Array<{
    lang_iso: string;
    custom_iso?: string;
  }>;
  base_lang_iso?: string;
  project_type?: "localization_files" | "paged_documents" | "content_integration" | "marketing" | "marketing_integrations";
  is_segmentation_enabled?: boolean;
  content_integration?: string;
};
type UpdateProjectParams = {
  name: string;
  description?: string;
};
type ProjectDeleted = {
  project_id: string;
  project_deleted: boolean;
};
type ProjectEmptied = {
  project_id: string;
  keys_deleted: boolean;
};
type ProjectListParams = PaginationParams & {
  filter_team_id?: number | string;
  filter_names?: string;
  include_statistics?: string | number;
  include_settings?: string | number;
};
//#endregion
//#region src/types/segments.d.ts
type GetSegmentParams = {
  project_id: string;
  key_id: number | string;
  language_iso: string;
  disable_references?: number | string;
};
type UpdateSegmentReqParams = Omit<GetSegmentParams, "disable_references">;
type UpdateSegmentBodyParams = {
  value: string;
  is_fuzzy?: boolean;
  is_reviewed?: boolean;
  custom_translation_status_ids?: string[] | number[];
};
type ListSegmentParams = GetSegmentParams & {
  filter_is_reviewed?: number | string;
  filter_unverified?: number | string;
  filter_untranslated?: number | string;
  filter_qa_issues?: string;
};
//#endregion
//#region src/types/snapshots.d.ts
type CreateSnapshotParams = {
  title: string;
};
type SnapshotDeleted = {
  project_id: string;
  snapshot_deleted: boolean;
  branch?: string;
};
//#endregion
//#region src/types/tasks.d.ts
type TaskLanguage = {
  language_iso: string;
  users?: string[] | number[];
  groups?: string[] | number[];
};
type CreateTaskParams = {
  title: string;
  description?: string;
  due_date?: string;
  keys?: string[] | number[];
  languages?: Array<TaskLanguage>;
  source_language_iso?: string;
  auto_close_languages?: boolean;
  auto_close_task?: boolean;
  auto_close_items?: boolean;
  task_type?: "translation" | "automatic_translation" | "lqa_by_ai" | "review";
  parent_task_id?: string | number;
  closing_tags?: string[];
  do_lock_translations?: boolean;
  custom_translation_status_ids?: string[] | number[];
  save_ai_translation_to_tm?: boolean;
  apply_ai_tm100_matches?: boolean;
  mark_verified?: boolean;
};
type UpdateTaskParams = Omit<CreateTaskParams, "title" | "keys" | "source_language_iso" | "task_type" | "parent_task_id" | "custom_translation_status_ids" | "save_ai_translation_to_tm" | "apply_ai_tm100_matches" | "mark_verified"> & {
  title?: string;
  close_task?: boolean;
  languages?: Array<TaskLanguage & {
    close_language?: boolean;
  }>;
};
type TaskDeleted = {
  project_id: string;
  task_deleted: boolean;
  branch?: string;
};
type ListTaskParams = ProjectWithPagination & {
  filter_title?: string;
  filter_statuses?: "created" | "queued" | "in_progress" | "completed";
};
//#endregion
//#region src/types/team_users.d.ts
type TeamUserParams = {
  role?: "owner" | "admin" | "member" | "biller";
};
type TeamUserDeleted = {
  team_id: string;
  team_user_deleted: boolean;
};
//#endregion
//#region src/types/translation_statuses.d.ts
type CreateTranslationStatusParams = {
  title: string;
  color: string;
};
type UpdateTranslationStatusParams = {
  title?: string;
  color?: string;
};
type TranslationStatusDeleted = {
  project_id: string;
  custom_translation_status_deleted: boolean;
  branch?: string;
};
type TranslationStatusColors = {
  colors: string[];
};
//#endregion
//#region src/types/user_groups.d.ts
type GroupLanguages = {
  reference: string[];
  contributable: string[];
};
type UserGroupParams = {
  name: string;
  is_reviewer: boolean;
  is_admin: boolean;
  role_id?: ContributorRoles;
  admin_rights?: ContributorRights[];
  languages?: GroupLanguages;
};
type UserGroupDeleted = {
  team_id: string;
  group_deleted: boolean;
};
//#endregion
//#region src/types/webhook_events/project_branch_added.d.ts
type WebhookProjectBranchAdded = {
  event: "project.branch.added";
  project: {
    id: string;
    name: string;
  };
  branch: {
    id: number | string;
    name: string;
  };
  user: {
    full_name: string;
    email: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_branch_deleted.d.ts
type WebhookProjectBranchDeleted = {
  event: "project.branch.deleted";
  project: {
    id: string;
    name: string;
  };
  branch: {
    id: number | string;
    name: string;
  };
  user: {
    full_name: string;
    email: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_branch_merged.d.ts
type WebhookProjectBranchMerged = {
  event: "project.branch.merged";
  project: {
    id: string;
    name: string;
  };
  branch: {
    id: number | string;
    name: string;
  };
  target_branch: {
    id: number | string;
    name: string;
  };
  affected_keys: {
    inserted_count: number;
    updated_count: number;
  };
  user: {
    full_name: string;
    email: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_contributor_added.d.ts
type WebhookProjectContributorAdded = {
  event: "project.contributor.added";
  contributor: {
    email: string;
  };
  project: {
    id: string;
    name: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_contributor_added_public.d.ts
type WebhookProjectContributorAddedPublic = {
  event: "project.contributor.added_public";
  contributor: {
    email: string;
  };
  project: {
    id: string;
    name: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_contributor_deleted.d.ts
type WebhookProjectContributorDeleted = {
  event: "project.contributor.deleted";
  contributor: {
    email: string;
  };
  project: {
    id: string;
    name: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_copied.d.ts
type WebhookProjectCopied = {
  event: "project.copied";
  action?: string;
  project: {
    id: string;
    name: string;
  };
  new_project: {
    id: string;
    name: string;
  };
  user: {
    full_name: string;
    email: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_deleted.d.ts
type WebhookProjectDeleted = {
  event: "project.deleted";
  project: {
    id: string;
    name: string;
  };
  user: {
    full_name: string;
    email: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_exported.d.ts
type WebhookProjectExported = {
  event: "project.exported";
  export: {
    type: string;
    filename: string;
    platform: SupportedPlatforms;
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_imported.d.ts
type WebhookProjectImported = {
  event: "project.imported";
  import: {
    filename: string;
    format: string;
    inserted: number;
    updated: number;
    skipped: number;
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  import_options: {
    replace_line_breaks: boolean;
    convert_placeholders: boolean;
    replace_modified: boolean;
    key_tags: string[];
    tag_keys_inserted: boolean;
    tag_keys_updated: boolean;
    tag_keys_skipped: boolean;
    detect_icu_plurals: boolean;
    fill_empty_with_keys: boolean;
    hide_from_contributors: boolean;
    diff_by_file: boolean;
    use_tm: boolean;
    cleanup: boolean;
  };
  language: {
    id: number;
    iso: string;
    name: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_key_added.d.ts
type WebhookProjectKeyAdded = {
  event: "project.key.added";
  key: {
    id: number;
    name: string;
    base_value: string;
    tags: string[];
    filenames: Filenames;
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_key_comment_added.d.ts
type WebhookProjectKeyCommentAdded = {
  event: "project.key.comment.added";
  comment: {
    value: string;
  };
  key: {
    id: number;
    name: string;
    filenames: Filenames;
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_key_modified.d.ts
type WebhookProjectKeyModified = {
  event: "project.key.modified";
  key: {
    id: number;
    name: string;
    previous_name?: string | null;
    tags: string[];
    filenames: Filenames;
    hidden: boolean;
    screenshots: string[] | number[];
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_keys_added.d.ts
type WebhookProjectKeysAdded = {
  event: "project.keys.added";
  action?: "string";
  keys: Array<{
    id: number;
    name: string;
    base_value: string;
    tags: string[];
    filenames: Filenames;
    previous_name?: string | null;
    hidden: boolean;
    screenshots: string[] | number[];
  }>;
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_keys_deleted.d.ts
type WebhookProjectKeysDeleted = {
  event: "project.keys.deleted";
  action?: string;
  keys: Array<{
    id: number;
    name: string;
    base_value: string;
    filenames: Filenames;
  }>;
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_keys_modified.d.ts
type WebhookProjectKeysModified = {
  event: "project.keys.modified";
  action?: string;
  keys: Array<{
    id: number;
    name: string;
    previous_name?: string | null;
    tags: string[];
    filenames: Filenames;
    hidden: boolean;
    screenshots: string[] | number[];
  }>;
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_language_removed.d.ts
type WebhookProjectLanguageRemoved = {
  event: "project.language.removed";
  language: {
    id: number;
    iso: string;
    name: string;
  };
  project: {
    id: string;
    name: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_language_settings_changed.d.ts
type WebhookProjectLanguageSettingsChanged = {
  event: "project.language.settings_changed";
  language: {
    id: number;
    iso: string;
    name: string;
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_languages_added.d.ts
type WebhookProjectLanguagesAdded = {
  event: "project.languages.added";
  languages: Array<{
    id: number;
    iso: string;
    name: string;
  }>;
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_snapshot_created.d.ts
type WebhookProjectSnapshotCreated = {
  event: "project.snapshot";
  project: {
    id: string;
    name: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_task_closed.d.ts
type WebhookProjectTaskClosed = {
  event: "project.task.closed";
  task: {
    id: number;
    type: string;
    title: string;
    due_date: string | null;
    description: string;
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_task_created.d.ts
type WebhookProjectTaskCreated = {
  event: "project.task.created";
  task: {
    id: number;
    type: string;
    title: string;
    due_date: string | null;
    description: string;
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_task_deleted.d.ts
type WebhookProjectTaskDeleted = {
  event: "project.task.deleted";
  task: {
    id: number;
    type: string;
    title: string;
    due_date: string | null;
    description: string;
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_task_initial_tm_leverage_calculated.d.ts
type TmLeverage = {
  "0": number;
  "50": number;
  "75": number;
  "85": number;
  "95": number;
  "100%": number;
};
type WebhookProjectTaskInitialTmLeverageCalculated = {
  event: "project.task.initial_tm_leverage.calculated";
  task: {
    id: number;
    title: string;
    description: string;
    initial_tm_leverage: {
      [key: string | number]: TmLeverage;
    };
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_task_language_closed.d.ts
type WebhookProjectTaskLanguageClosed = {
  event: "project.task.language.closed";
  language: {
    id: number;
    iso: string;
    name: string;
  };
  task: {
    id: number;
    type: string;
    title: string;
    due_date: string | null;
    description: string;
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_task_queued.d.ts
type WebhookProjectTaskQueued = {
  event: "project.task.queued";
  task: {
    id: number;
    type: string;
    title: string;
    due_date: string | null;
    description: string;
  };
  project: {
    id: string;
    name: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_translation_proofread.d.ts
type WebhookProjectTranslationProofread = {
  event: "project.translation.proofread";
  translation: {
    id: number;
    value: string;
    is_proofread: boolean;
    segment?: number;
  };
  language: {
    id: number;
    iso: string;
    name: string;
  };
  key: {
    id: number;
    name: string;
    filenames: Filenames;
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_translation_updated.d.ts
type WebhookProjectTranslationUpdated = {
  event: "project.translation.updated";
  translation: {
    id: number;
    value: string;
    previous_value: string;
    segment?: number;
  };
  language: {
    id: number;
    iso: string;
    name: string;
  };
  key: {
    id: number;
    name: string;
    filenames: Filenames;
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_translations_proofread.d.ts
type WebhookProjectTranslationsProofread = {
  event: "project.translations.proofread";
  action: string;
  translations: Array<{
    id: number;
    value: string;
    is_proofread: boolean;
    language: {
      id: number;
      iso: string;
      name: string;
    };
    key: {
      id: number;
      name: string;
      filenames: Filenames;
    };
  }>;
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/project_translations_updated.d.ts
type WebhookProjectTranslationsUpdated = {
  event: "project.translations.updated";
  action: string;
  translations: Array<{
    id: number;
    value: string;
    previous_value: string;
    language: {
      id: number;
      iso: string;
      name: string;
    };
    key: {
      id: number;
      name: string;
      filenames: Filenames;
    };
  }>;
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    full_name: string;
    email: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/team_order_completed.d.ts
type WebhookTeamOrderCompleted = {
  event: "team.order.completed";
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  order: {
    id: string;
    provider: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/team_order_created.d.ts
type WebhookTeamOrderCreated = {
  event: "team.order.created";
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  order: {
    id: string;
    provider: string;
    currency: string;
    total: string | number;
    languages: Array<{
      id: number;
      iso: string;
      name: string;
    }>;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhook_events/team_order_deleted.d.ts
type WebhookTeamOrderDeleted = {
  event: "team.order.deleted";
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    full_name: string;
    email: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
//#endregion
//#region src/types/webhooks.d.ts
type WebhookEvents = "project.branch.added" | "project.branch.deleted" | "project.branch.merged" | "project.contributor.added" | "project.contributor.deleted" | "project.deleted" | "project.exported" | "project.imported" | "project.key.added" | "project.key.comment.added" | "project.key.modified" | "project.keys.deleted" | "project.language.removed" | "project.language.settings_changed" | "project.languages.added" | "project.snapshot" | "project.task.closed" | "project.task.created" | "project.task.deleted" | "project.task.language.closed" | "project.translation.proofread" | "project.translation.updated" | "team.order.completed" | "team.order.created" | "team.order.deleted";
type WebhookEventLangMap = {
  event?: WebhookEvents;
  lang_iso_codes?: string[];
};
type CreateWebhookParams = {
  url: string;
  branch?: string;
  events: WebhookEvents[];
  event_lang_map?: WebhookEventLangMap[];
};
type UpdateWebhookParams = Omit<CreateWebhookParams, "url" | "events"> & {
  url?: string;
  events?: WebhookEvents[];
};
type WebhookDeleted = {
  project_id: string;
  webhook_deleted: boolean;
};
type WebhookRegenerated = {
  project_id: string;
  secret: string;
};
//#endregion
//#region src/collections/permission_templates.d.ts
declare class PermissionTemplates extends BaseCollection<PermissionTemplate> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => PermissionTemplate;
  protected get rootElementName(): string;
  list(request_params: TeamOnly): Promise<PaginatedResult<PermissionTemplate>>;
}
//#endregion
//#region src/models/project.d.ts
declare class Project$1 extends BaseModel implements Project {
  project_id: string;
  project_type: string;
  uuid?: string;
  name: string;
  description: string;
  created_at: string;
  created_at_timestamp: number;
  created_by: number;
  created_by_email: string;
  team_id: number;
  team_uuid: string;
  base_language_id: number;
  base_language_iso: string;
  settings: ProjectSettings;
  statistics: ProjectStatistics;
}
//#endregion
//#region src/collections/projects.d.ts
declare class Projects extends BaseCollection<Project$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Project$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params?: ProjectListParams): Promise<PaginatedResult<Project$1>>;
  create(project_params: CreateProjectParams): Promise<Project$1>;
  get(project_id: string): Promise<Project$1>;
  update(project_id: string, project_params: UpdateProjectParams): Promise<Project$1>;
  delete(project_id: string): Promise<ProjectDeleted>;
  empty(project_id: string): Promise<ProjectEmptied>;
}
//#endregion
//#region src/collections/queued_processes.d.ts
declare class QueuedProcesses extends BaseCollection<QueuedProcess$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => QueuedProcess$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: ProjectWithPagination): Promise<PaginatedResult<QueuedProcess$1>>;
  get(process_id: string | number, request_params: ProjectOnly): Promise<QueuedProcess$1>;
}
//#endregion
//#region src/models/screenshot.d.ts
declare class Screenshot$1 extends BaseModel implements Screenshot {
  screenshot_id: number;
  key_ids: number[];
  keys: Array<{
    key_id: number;
    coordinates: {
      left: number;
      top: number;
      width: number;
      height: number;
    };
  }>;
  url: string;
  title: string;
  description: string;
  screenshot_tags: string[];
  width: number;
  height: number;
  created_at: string;
  created_at_timestamp: number;
}
//#endregion
//#region src/collections/screenshots.d.ts
declare class Screenshots extends BaseCollection<Screenshot$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Screenshot$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: ProjectWithPagination): Promise<PaginatedResult<Screenshot$1>>;
  create(raw_body: CreateScreenshotParams | CreateScreenshotParams[], request_params: ProjectOnly): Promise<BulkResult<Screenshot$1>>;
  get(screnshot_id: string | number, request_params: ProjectOnly): Promise<Screenshot$1>;
  update(screenshot_id: string | number, screenshot_params: UpdateScreenshotParams, request_params: ProjectOnly): Promise<Screenshot$1>;
  delete(screenshot_id: string | number, request_params: ProjectOnly): Promise<ScreenshotDeleted>;
}
//#endregion
//#region src/models/translation_status.d.ts
declare class TranslationStatus$1 extends BaseModel implements TranslationStatus {
  status_id: number;
  title: string;
  color: string;
}
//#endregion
//#region src/models/segment.d.ts
declare class Segment$1 extends BaseModel implements Segment {
  segment_number: number;
  language_iso: string;
  modified_at: string;
  modified_at_timestamp: number;
  modified_by: number;
  modified_by_email: string;
  value: string;
  is_fuzzy: boolean;
  is_reviewed: boolean;
  reviewed_by: number;
  words: number;
  custom_translation_statuses: TranslationStatus$1[];
}
//#endregion
//#region src/collections/segments.d.ts
declare class Segments extends BaseCollection<Segment$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Segment$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: ListSegmentParams): Promise<Segment$1[]>;
  get(segment_number: string | number, request_params: GetSegmentParams): Promise<Segment$1>;
  update(segment_number: string | number, segment_params: UpdateSegmentBodyParams, request_params: UpdateSegmentReqParams): Promise<Segment$1>;
}
//#endregion
//#region src/models/snapshot.d.ts
declare class Snapshot$1 extends BaseModel implements Snapshot {
  snapshot_id: number;
  title: string;
  created_at: string;
  created_at_timestamp: number;
  created_by: number;
  created_by_email: string;
}
//#endregion
//#region src/collections/snapshots.d.ts
declare class Snapshots extends BaseCollection<Snapshot$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Snapshot$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: ProjectWithPagination): Promise<PaginatedResult<Snapshot$1>>;
  create(snapshot_params: CreateSnapshotParams, request_params: ProjectOnly): Promise<Snapshot$1>;
  restore(snapshot_id: string | number, request_params: ProjectOnly): Promise<Project$1>;
  delete(snapshot_id: string | number, request_params: ProjectOnly): Promise<SnapshotDeleted>;
}
//#endregion
//#region src/models/task.d.ts
declare class Task$1 extends BaseModel implements Task {
  task_id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
  due_date: string;
  due_date_timestamp: number;
  keys_count: number;
  words_count: number;
  created_at: string;
  created_at_timestamp: number;
  created_by: number;
  created_by_email: string;
  can_be_parent: boolean;
  task_type: string;
  parent_task_id: number;
  closing_tags: string[];
  do_lock_translations: boolean;
  languages: Array<{
    language_iso: string;
    users: Array<{
      user_id: string | number;
      email: string;
      fullname: string;
    }>;
    groups: Array<{
      id: string | number;
      name: string;
    }>;
    keys: string[] | number[];
    status: string;
    progress: number;
    initial_tm_leverage: {
      "0%+": number;
      "60%+": number;
      "75%+": number;
      "95%+": number;
      "100%": number;
    };
    tm_leverage: {
      status: string;
      value: {
        "0%+": number;
        "50%+": number;
        "75%+": number;
        "85%+": number;
        "95%+": number;
        "100%": number;
      };
    };
    keys_count: number;
    words_count: number;
    completed_at: string;
    completed_at_timestamp: number;
    completed_by: number;
    completed_by_email: string;
  }>;
  source_language_iso: string;
  auto_close_languages: boolean;
  auto_close_task: boolean;
  auto_close_items: boolean;
  completed_at: string;
  completed_at_timestamp: number;
  completed_by: number;
  completed_by_email: string;
  custom_translation_status_ids: number[];
}
//#endregion
//#region src/collections/tasks.d.ts
declare class Tasks extends BaseCollection<Task$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Task$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: ListTaskParams): Promise<PaginatedResult<Task$1>>;
  create(task_params: CreateTaskParams, request_params: ProjectOnly): Promise<Task$1>;
  get(task_id: string | number, request_params: ProjectOnly): Promise<Task$1>;
  update(task_id: string | number, task_params: UpdateTaskParams, request_params: ProjectOnly): Promise<Task$1>;
  delete(task_id: string | number, request_params: ProjectOnly): Promise<TaskDeleted>;
}
//#endregion
//#region src/models/team_user_billing_details.d.ts
declare class TeamUserBillingDetails$2 extends BaseModel implements TeamUserBillingDetails {
  billing_email: string;
  country_code: string;
  zip: string;
  state_code: string;
  address1: string;
  address2: string;
  city: string;
  phone: string;
  company: string;
  vatnumber: string;
}
//#endregion
//#region src/collections/team_user_billing_details.d.ts
declare class TeamUserBillingDetails$1 extends BaseCollection<TeamUserBillingDetails$2> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => TeamUserBillingDetails$2;
  get(team_id: string | number): Promise<TeamUserBillingDetails$2>;
  create(billing_details_params: BillingDetailsParams, request_params: TeamOnly): Promise<TeamUserBillingDetails$2>;
  update(team_id: string | number, billing_details_params: BillingDetailsParams): Promise<TeamUserBillingDetails$2>;
}
//#endregion
//#region src/models/team_user.d.ts
declare class TeamUser$1 extends BaseModel implements TeamUser {
  user_id: number;
  email: string;
  fullname: string;
  created_at: string;
  created_at_timestamp: number;
  role: string;
  uuid?: string;
}
//#endregion
//#region src/collections/team_users.d.ts
declare class TeamUsers extends BaseCollection<TeamUser$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => TeamUser$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: TeamWithPagination): Promise<PaginatedResult<TeamUser$1>>;
  get(team_user_id: string | number, request_params: TeamOnly): Promise<TeamUser$1>;
  update(team_user_id: string | number, team_user_params: TeamUserParams, request_params: TeamOnly): Promise<TeamUser$1>;
  delete(team_user_id: string | number, request_params: TeamOnly): Promise<TeamUserDeleted>;
}
//#endregion
//#region src/models/team.d.ts
declare class Team$1 extends BaseModel implements Team {
  team_id: number;
  name: string;
  created_at: string;
  created_at_timestamp: number;
  plan: string;
  quota_usage: {
    users: number;
    keys: number;
    projects: number;
    mau: number;
    ai_words: number;
  };
  quota_allowed: {
    users: number;
    keys: number;
    projects: number;
    mau: number;
    ai_words: number;
  };
}
//#endregion
//#region src/collections/teams.d.ts
declare class Teams extends BaseCollection<Team$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Team$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params?: PaginationParams): Promise<PaginatedResult<Team$1>>;
  get(id: number | string): Promise<Team$1>;
}
//#endregion
//#region src/models/translation_provider.d.ts
declare class TranslationProvider$1 extends BaseModel implements TranslationProvider {
  provider_id: number;
  name: string;
  slug: string;
  price_pair_min: number;
  website_url: string;
  description: string;
  tiers: Array<{
    tier_id: number;
    title: string;
  }>;
  pairs: Array<{
    tier_id: number;
    from_lang_iso: string;
    from_lang_name: string;
    to_lang_iso: string;
    to_lang_name: string;
    price_per_word: number;
  }>;
}
//#endregion
//#region src/collections/translation_providers.d.ts
declare class TranslationProviders extends BaseCollection<TranslationProvider$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => TranslationProvider$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: TeamWithPagination): Promise<PaginatedResult<TranslationProvider$1>>;
  get(provider_id: string | number, request_params: TeamOnly): Promise<TranslationProvider$1>;
}
//#endregion
//#region src/collections/translation_statuses.d.ts
declare class TranslationStatuses extends BaseCollection<TranslationStatus$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => TranslationStatus$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: ProjectWithPagination): Promise<PaginatedResult<TranslationStatus$1>>;
  create(translation_status_params: CreateTranslationStatusParams, request_params: ProjectOnly): Promise<TranslationStatus$1>;
  get(translation_status_id: string | number, request_params: ProjectOnly): Promise<TranslationStatus$1>;
  update(translation_status_id: string | number, translation_status_params: UpdateTranslationStatusParams, request_params: ProjectOnly): Promise<TranslationStatus$1>;
  delete(translation_status_id: string | number, request_params: ProjectOnly): Promise<TranslationStatusDeleted>;
  available_colors(request_params: ProjectOnly): Promise<TranslationStatusColors>;
}
//#endregion
//#region src/models/translation.d.ts
declare class Translation$1 extends BaseModel implements Translation {
  translation_id: number;
  key_id: number;
  language_iso: string;
  modified_at: string;
  modified_at_timestamp: number;
  modified_by: number;
  modified_by_email: string;
  translation: string;
  is_unverified: boolean;
  is_reviewed: boolean;
  reviewed_by: number;
  is_fuzzy: boolean;
  words: number;
  custom_translation_statuses: TranslationStatus[];
  task_id: number;
  segment_number: number;
}
//#endregion
//#region src/collections/translations.d.ts
declare class Translations extends BaseCollection<Translation$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Translation$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: ListTranslationParams): Promise<CursorPaginatedResult<Translation$1>>;
  get(translation_id: string | number, request_params: GetTranslationParams): Promise<Translation$1>;
  update(translation_id: string | number, translation_params: UpdateTranslationParams, request_params: ProjectOnly): Promise<Translation$1>;
}
//#endregion
//#region src/models/user_group.d.ts
declare class UserGroup$1 extends BaseModel implements UserGroup {
  group_id: number;
  name: string;
  permissions: {
    is_admin: boolean;
    is_reviewer: boolean;
    admin_rights: string[];
    languages: Array<{
      lang_id: number;
      lang_iso: string;
      lang_name: string;
      is_writable: boolean;
    }>;
  };
  created_at: string;
  created_at_timestamp: number;
  team_id: number;
  projects: string[] | number[];
  members: number[] | string[];
  role_id: number | null;
}
//#endregion
//#region src/collections/user_groups.d.ts
declare class UserGroups extends BaseCollection<UserGroup$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => UserGroup$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: TeamWithPagination): Promise<PaginatedResult<UserGroup$1>>;
  create(user_group_params: UserGroupParams, request_params: TeamOnly): Promise<UserGroup$1>;
  get(user_group_id: string | number, request_params: TeamOnly): Promise<UserGroup$1>;
  update(user_group_id: string | number, user_group_params: UserGroupParams, request_params: TeamOnly): Promise<UserGroup$1>;
  delete(user_group_id: string | number, request_params: TeamOnly): Promise<UserGroupDeleted>;
  add_members_to_group(team_id: string | number, group_id: string | number, user_ids: string[] | number[]): Promise<UserGroup$1>;
  remove_members_from_group(team_id: string | number, group_id: string | number, user_ids: string[] | number[]): Promise<UserGroup$1>;
  add_projects_to_group(team_id: string | number, group_id: string | number, project_ids: string[] | number[]): Promise<UserGroup$1>;
  remove_projects_from_group(team_id: string | number, group_id: string | number, project_ids: string[] | number[]): Promise<UserGroup$1>;
  protected populateGroupFromJsonRoot(json: Record<string, unknown>, headers: Headers): UserGroup$1;
}
//#endregion
//#region src/models/webhook.d.ts
declare class Webhook$1 extends BaseModel implements Webhook {
  webhook_id: string;
  branch: string;
  url: string;
  secret: string;
  events: string[];
  event_lang_map: Array<{
    event: string;
    lang_iso_codes: string[];
  }>;
}
//#endregion
//#region src/collections/webhooks.d.ts
declare class Webhooks extends BaseCollection<Webhook$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Webhook$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: ProjectWithPagination): Promise<PaginatedResult<Webhook$1>>;
  create(webhook_params: CreateWebhookParams, request_params: ProjectOnly): Promise<Webhook$1>;
  get(webhook_id: string | number, request_params: ProjectOnly): Promise<Webhook$1>;
  update(webhook_id: string | number, webhook_params: UpdateWebhookParams, request_params: ProjectOnly): Promise<Webhook$1>;
  delete(webhook_id: string | number, request_params: ProjectOnly): Promise<WebhookDeleted>;
  regenerate_secret(webhook_id: string | number, request_params: ProjectOnly): Promise<WebhookRegenerated>;
}
//#endregion
//#region src/lokalise/base_client.d.ts
/**
 * A foundational client class that establishes authentication and configuration data.
 * Other specialized clients can inherit from this class to leverage the configured
 * authentication, compression, host, and timeout settings.
 */
declare class BaseClient {
  /**
   * Internal client data including token, token type, host, compression, and timeouts.
   */
  readonly clientData: ClientData;
  /**
   * Constructs a new BaseClient instance.
   * @param params - Configuration parameters including API key and optional features.
   * @throws Error if the API key is not provided or is empty.
   */
  constructor({
    apiKey,
    enableCompression,
    silent,
    tokenType,
    host,
    requestTimeout,
    userAgent
  }: ClientParams);
}
//#endregion
//#region src/lokalise/lokalise_api.d.ts
/**
 * A main entry point for interacting with the Lokalise API.
 * Provides easy access to various resource collections (Branches, Comments, Projects, etc.)
 * through dedicated methods.
 */
declare class LokaliseApi extends BaseClient {
  /**
   * Creates a new instance of the LokaliseApi client.
   * @param params - Configuration parameters including `apiKey` and optional `version`, `host`, etc.
   */
  constructor(params: ClientParams);
  /**
   * Access Branch-related endpoints.
   */
  branches(): Branches;
  /**
   * Access Comment-related endpoints.
   */
  comments(): Comments;
  /**
   * Access Contributor-related endpoints.
   */
  contributors(): Contributors;
  /**
   * Access File-related endpoints.
   */
  files(): Files;
  /**
   * Access Glossary-related endpoints.
   */
  glossaryTerms(): GlossaryTerms;
  /**
   * Access JWT-related endpoints.
   */
  jwt(): Jwt$1;
  /**
   * Access Key-related endpoints.
   */
  keys(): Keys;
  /**
   * Access Language-related endpoints.
   */
  languages(): Languages;
  /**
   * Access Order-related endpoints.
   */
  orders(): Orders;
  /**
   * Access Payment Card-related endpoints.
   */
  paymentCards(): PaymentCards;
  /**
   * Access Permission Template-related endpoints.
   */
  permissionTemplates(): PermissionTemplates;
  /**
   * Access Project-related endpoints.
   */
  projects(): Projects;
  /**
   * Access Queued Process-related endpoints.
   */
  queuedProcesses(): QueuedProcesses;
  /**
   * Access Screenshot-related endpoints.
   */
  screenshots(): Screenshots;
  /**
   * Access Segment-related endpoints.
   */
  segments(): Segments;
  /**
   * Access Snapshot-related endpoints.
   */
  snapshots(): Snapshots;
  /**
   * Access Task-related endpoints.
   */
  tasks(): Tasks;
  /**
   * Access Team-related endpoints.
   */
  teams(): Teams;
  /**
   * Access Team User-related endpoints.
   */
  teamUsers(): TeamUsers;
  /**
   * Access Team User Billing Detail-related endpoints.
   */
  teamUserBillingDetails(): TeamUserBillingDetails$1;
  /**
   * Access Translation-related endpoints.
   */
  translations(): Translations;
  /**
   * Access Translation Provider-related endpoints.
   */
  translationProviders(): TranslationProviders;
  /**
   * Access Translation Status-related endpoints.
   */
  translationStatuses(): TranslationStatuses;
  /**
   * Access User Group-related endpoints.
   */
  userGroups(): UserGroups;
  /**
   * Access Webhook-related endpoints.
   */
  webhooks(): Webhooks;
}
//#endregion
//#region src/lokalise/lokalise_api_oauth.d.ts
/**
 * A specialized client for interacting with the Lokalise API using OAuth authentication.
 * Extends `LokaliseApi` and configures the token type and authorization header to use Bearer tokens.
 */
declare class LokaliseApiOAuth extends LokaliseApi {
  /**
   * Constructs a new LokaliseApiOAuth client instance.
   * @param params - Configuration parameters including `apiKey` (OAuth token)
   *                 and optionally `tokenType` (defaults to "Bearer").
   * @throws Error If `apiKey` is missing or empty.
   */
  constructor(params: ClientParams);
}
//#endregion
//#region src/models/ota/ota_bundle.d.ts
declare class OtaBundle$1 extends BaseModel implements OtaBundle {
  id: number;
  projectId: string;
  isPrerelease: boolean;
  isProduction: boolean;
  createdAt: string;
  createdBy: string;
  framework: string;
  description: string;
  isFrozen: boolean;
  lokaliseId: number;
  fileId: string;
  fileUrl: string;
  modifiedAt: string;
}
//#endregion
//#region src/ota_collections/ota_collection.d.ts
declare abstract class OtaCollection<ElementType, SecondaryType = ElementType> extends BaseCollection<ElementType, SecondaryType> {
  protected doDelete<T = Record<string, unknown> | Record<string, unknown>[]>(id: string | number, req_params: Record<string, unknown>): Promise<T>;
  protected returnJSONFromData(json: Record<string, unknown>): Record<string, unknown> | Array<Record<string, unknown>>;
  protected createVoidPromise(method: HttpMethod, params: Record<string, unknown>, body: object | object[] | null, uri?: string | null): Promise<null>;
}
//#endregion
//#region src/ota_collections/ota_bundle_management.d.ts
declare class OtaBundleManagement extends OtaCollection<OtaBundle$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => OtaBundle$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: OtaTeamProject): Promise<OtaBundle$1[]>;
  get(bundleId: string | number, requestParams: OtaTeamProject): Promise<OtaBundle$1>;
  update(bundleId: string | number, bundleParams: OtaBundleUpdateData, requestParams: OtaTeamProject): Promise<OtaBundle$1>;
  delete(bundleId: string | number, requestParams: OtaTeamProject): Promise<OtaResourceDeleted>;
}
//#endregion
//#region src/ota_collections/ota_bundle_publishing.d.ts
declare class OtaBundlePublishing extends OtaCollection<void> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => Branch$1;
  publish(bundleId: number | string, request_params: OtaTeamProjectFramework): Promise<null>;
  stage(bundleId: number | string, request_params: OtaTeamProjectFramework): Promise<null>;
}
//#endregion
//#region src/models/ota/ota_bundle_archive.d.ts
declare class OtaBundleArchive$1 extends BaseModel implements OtaBundleArchive {
  url: string;
  version: number;
}
//#endregion
//#region src/ota_collections/ota_bundles.d.ts
declare class OtaBundles extends OtaCollection<OtaBundleArchive$1> {
  protected static rootElementNameSingular: string;
  protected static prefixURI: string;
  protected static elementClass: typeof OtaBundleArchive$1;
  protected get elementClass(): new (json: Record<string, unknown>) => OtaBundleArchive$1;
  protected get rootElementNameSingular(): string;
  get(bundle_params: OtaRequestBundleParams, request_params: OtaProjectFramework): Promise<OtaBundleArchive$1>;
}
//#endregion
//#region src/models/ota/ota_freeze_period.d.ts
declare class OtaFreezePeriod$1 extends BaseModel implements OtaFreezePeriod {
  id: number;
  projectId: number;
  bundleId: number;
  framework: string;
  from: string;
  to: string;
}
//#endregion
//#region src/ota_collections/ota_freeze_periods.d.ts
declare class OtaFreezePeriods extends OtaCollection<OtaFreezePeriod$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => OtaFreezePeriod$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(requestParams: OtaTeamProjectFramework): Promise<OtaFreezePeriod$1[]>;
  create(freezeParams: OtaFreezePeriodParams, requestParams: OtaTeamProject): Promise<OtaFreezePeriod$1>;
  update(freezeId: string | number, freezeParams: OtaFreezePeriodParams, requestParams: OtaTeamProject): Promise<OtaFreezePeriod$1>;
  delete(freezeId: string | number, requestParams: OtaTeamProject): Promise<OtaResourceDeleted>;
}
//#endregion
//#region src/models/ota/ota_sdk_token.d.ts
declare class OtaSdkToken$1 extends BaseModel implements OtaSdkToken {
  id: number;
  token: string;
  projectId: number;
  lokaliseId: number;
  createdAt: string;
}
//#endregion
//#region src/ota_collections/ota_sdk_tokens.d.ts
declare class OtaSdkTokens extends OtaCollection<OtaSdkToken$1> {
  protected static prefixURI: string;
  protected get elementClass(): new (json: Record<string, unknown>) => OtaSdkToken$1;
  protected get rootElementName(): string;
  protected get rootElementNameSingular(): string | null;
  list(request_params: OtaTeamProject): Promise<OtaSdkToken$1[]>;
  create(request_params: OtaTeamProject): Promise<OtaSdkToken$1>;
  delete(tokenId: string | number, request_params: OtaTeamProject): Promise<OtaResourceDeleted>;
}
//#endregion
//#region src/models/ota/ota_statistics.d.ts
declare class OtaStatistics$1 extends BaseModel implements OtaStatistics {
  lokaliseProjectId: string;
  from: string;
  to: string;
  sdk: string;
  daily: Array<{
    date: string;
    downloads: number;
    trafficMb: number;
    trafficBytes: string;
    framework: string;
  }>;
  monthly: Array<{
    date: string;
    downloads: number;
    trafficMb: number;
    trafficBytes: string;
    framework: string;
  }>;
  totals: {
    downloads: number;
    trafficMb: number;
    trafficBytes: string;
  };
}
//#endregion
//#region src/ota_collections/ota_usage_statistics.d.ts
declare class OtaUsageStatistics extends OtaCollection<OtaStatistics$1> {
  protected static prefixURI: string;
  protected static elementClass: typeof OtaStatistics$1;
  protected get elementClass(): new (json: Record<string, unknown>) => OtaStatistics$1;
  get(bundle_params: OtaUsageParams, request_params: OtaTeamProject): Promise<OtaStatistics$1>;
}
//#endregion
//#region src/lokalise/lokalise_api_ota.d.ts
/**
 * A specialized client configured for interacting with Lokalise OTA endpoints.
 * Extends `BaseClient` and sets defaults suitable for OTA requests:
 * - `tokenType` defaults to "Bearer"
 * - `authHeader` set to "Authorization"
 * - `host` defaults to "https://ota.lokalise.com"
 * - `version` defaults to "v3"
 */
declare class LokaliseApiOta extends BaseClient {
  /**
   * Creates a new LokaliseApiOta client instance.
   * @param params - Configuration parameters including `apiKey` and optional overrides for tokenType, host, version, etc.
   * @throws Error If `apiKey` is missing or empty.
   */
  constructor(params: ClientParams);
  /**
   * Provides access to the OtaBundleManagement collection.
   */
  otaBundleManagement(): OtaBundleManagement;
  /**
   * Provides access to the OtaBundlePublishing collection.
   */
  otaBundlePublishing(): OtaBundlePublishing;
  /**
   * Provides access to the OtaUsageStatistics collection.
   */
  otaUsageStatistics(): OtaUsageStatistics;
  /**
   * Provides access to the OtaFreezePeriods collection.
   */
  otaFreezePeriods(): OtaFreezePeriods;
  /**
   * Provides access to the OtaSdkTokens collection.
   */
  otaSdkTokens(): OtaSdkTokens;
}
//#endregion
//#region src/lokalise/lokalise_ota_bundles.d.ts
/**
 * A specialized client for interacting with Lokalise OTA (Over-The-Air) bundle resources.
 * Extends the BaseClient to configure authentication and endpoint specifics for OTA bundles.
 */
declare class LokaliseOtaBundles extends BaseClient {
  /**
   * Constructs a new LokaliseOtaBundles client instance.
   * @param params - Configuration parameters, including the required `apiKey`.
   *                 Optional parameters include `version`, `host`, etc.
   *                 Defaults: `host` = "https://ota.lokalise.com", `version` = "v3".
   * @throws Error If no valid API key is provided.
   */
  constructor(params: ClientParams);
  /**
   * Provides access to the OtaBundles collection.
   * @returns An OtaBundles instance.
   */
  otaBundles(): OtaBundles;
}
//#endregion
//#region src/oauth2/lokalise_auth.d.ts
declare class LokaliseAuth {
  authData: AuthData;
  /**
   * Instantiate LokaliseAuth to work with OAuth 2 tokens
   *
   * @param clientId - The client ID (mandatory)
   * @param clientSecret - The client secret (mandatory)
   * @param host - Optional host, defaults to "https://app.lokalise.com"
   * @param version - Optional API version, defaults to "oauth2"
   */
  constructor(clientId: string, clientSecret: string, host?: string, version?: string);
  /**
   * Generate the authorization URL
   *
   * @param scope - The scope(s) for the authorization
   * @param redirectUri - Optional redirect URI
   * @param state - Optional state parameter
   * @returns The authorization URL as a string
   */
  auth(scope: string | string[], redirectUri?: string, state?: string): string;
  /**
   * Exchange an authorization code for an access token
   *
   * @param code - The authorization code
   * @returns A promise resolving to the token response
   */
  token(code: string): Promise<RequestTokenResponse>;
  /**
   * Refresh an access token using a refresh token
   *
   * @param refreshToken - The refresh token
   * @returns A promise resolving to the token response
   */
  refresh(refreshToken: string): Promise<RefreshTokenResponse>;
  /**
   * Internal method to perform the API request
   *
   * @param params - Request parameters
   * @returns A promise resolving to the API response
   */
  private doRequest;
  /**
   * Build the authorization URL
   *
   * @param params - URL parameters
   * @returns The complete URL as a string
   */
  private buildUrl;
  /**
   * Get the base parameters for authentication requests
   *
   * @returns A record containing the client ID and client secret
   */
  private baseParams;
  /**
   * Handle API request errors and transform them into an `AuthError`
   *
   * @param error - The error object
   * @returns An `AuthError` instance
   */
  private handleReject;
}
//#endregion
//#region src/models/auth_error.d.ts
declare class AuthError extends BaseModel implements IAuthError {
  code: number;
  error: string;
  error_description: string;
  error_uri?: string;
}
//#endregion
export { ApiError, AuthData, AuthError, BillingDetailsParams, Branch, BranchDeleted, BranchMerged, BranchParams, BulkResult, BulkUpdateKeyParams, CardDeleted, ClientData, ClientParams, Comment, CommentData, CommentDeleted, Contributor, ContributorCreateData, ContributorDeleted, ContributorLanguages, ContributorRights, ContributorRoles, ContributorUpdateData, CreateCardParams, CreateKeyData, CreateKeyParams, CreateLanguageParams, CreateOrderParams, CreateProjectParams, CreateScreenshotParams, CreateSnapshotParams, CreateTaskParams, CreateTermsParams, CreateTranslationStatusParams, CreateWebhookParams, CursorPaginatedResult, CursorPagination, DownloadBundle, DownloadFileParams, DownloadedFileProcessDetails, File, FileDeleted, FileFormat, Filenames, GetKeyParams, GetSegmentParams, GetTranslationParams, GlossaryTerm, HttpMethod, IApiError, IAuthError, Jwt, Key, KeyDeleted, KeyParamsWithPagination, KeyProjectPagination, KeysBulkDeleted, Language, LanguageDeleted, ListFileParams, ListSegmentParams, ListTaskParams, ListTermsParams, ListTranslationParams, LokaliseApi, LokaliseApiOAuth, LokaliseApiOta, LokaliseAuth, LokaliseOtaBundles, MergeBranchParams, NumericBool, Order, OtaBundle, OtaBundleArchive, OtaBundleUpdateData, OtaFramework, OtaFreezePeriod, OtaFreezePeriodParams, OtaProjectFramework, OtaRequestBundleParams, OtaResourceDeleted, OtaSdkToken, OtaStatistics, OtaTeamProject, OtaTeamProjectFramework, OtaUsageParams, PaginatedResult, PaginationParams, PaymentCard, Project, ProjectAndKey, ProjectDeleted, ProjectEmptied, ProjectListParams, ProjectOnly, ProjectSettings, ProjectStatistics, ProjectWithPagination, QueuedProcess, QueuedProcessDetails, RefreshTokenResponse, RequestTokenResponse, Screenshot, ScreenshotData, ScreenshotDeleted, Segment, Snapshot, SnapshotDeleted, SupportedPlatforms, Task, TaskDeleted, TaskLanguage, Team, TeamOnly, TeamUser, TeamUserBillingDetails, TeamUserDeleted, TeamUserParams, TeamWithPagination, TermsDeleted, Translation, TranslationData, TranslationProvider, TranslationStatus, TranslationStatusColors, TranslationStatusDeleted, UpdateKeyData, UpdateKeyDataWithId, UpdateLanguageParams, UpdateProjectParams, UpdateScreenshotParams, UpdateSegmentBodyParams, UpdateSegmentReqParams, UpdateTaskParams, UpdateTermsParams, UpdateTranslationParams, UpdateTranslationStatusParams, UpdateWebhookParams, UploadFileParams, UploadedFileProcessDetails, UserGroup, UserGroupDeleted, UserGroupParams, Webhook, WebhookDeleted, WebhookEventLangMap, WebhookEvents, WebhookProjectBranchAdded, WebhookProjectBranchDeleted, WebhookProjectBranchMerged, WebhookProjectContributorAdded, WebhookProjectContributorAddedPublic, WebhookProjectContributorDeleted, WebhookProjectCopied, WebhookProjectDeleted, WebhookProjectExported, WebhookProjectImported, WebhookProjectKeyAdded, WebhookProjectKeyCommentAdded, WebhookProjectKeyModified, WebhookProjectKeysAdded, WebhookProjectKeysDeleted, WebhookProjectKeysModified, WebhookProjectLanguageRemoved, WebhookProjectLanguageSettingsChanged, WebhookProjectLanguagesAdded, WebhookProjectSnapshotCreated, WebhookProjectTaskClosed, WebhookProjectTaskCreated, WebhookProjectTaskDeleted, WebhookProjectTaskInitialTmLeverageCalculated, WebhookProjectTaskLanguageClosed, WebhookProjectTaskQueued, WebhookProjectTranslationProofread, WebhookProjectTranslationUpdated, WebhookProjectTranslationsProofread, WebhookProjectTranslationsUpdated, WebhookRegenerated, WebhookTeamOrderCompleted, WebhookTeamOrderCreated, WebhookTeamOrderDeleted };
//# sourceMappingURL=main.d.mts.map