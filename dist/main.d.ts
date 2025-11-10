interface PaginatedResult$1<T = unknown> {
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

interface Branch$1 {
    branch_id: number;
    name: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
}

declare abstract class BaseModel<T extends Record<string, unknown> = Record<string, unknown>> {
    constructor(params: Partial<T>);
}

declare class Branch extends BaseModel implements Branch$1 {
    branch_id: number;
    name: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
}

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
    branch: Branch$1;
    target_branch: Branch$1;
};

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

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

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
    response: ApiResponse;
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
    /**
     * Static async factory method to create an ApiRequest instance with a fully resolved response.
     * @param uri - The endpoint URI (versioned path expected).
     * @param method - The HTTP method (GET, POST, PUT, DELETE, etc).
     * @param body - The request payload, if applicable.
     * @param params - Query and/or path parameters.
     * @param clientData - Authentication and configuration data for the request.
     * @returns A promise that resolves to a fully constructed ApiRequest instance with the `response` set.
     */
    static create(uri: string, method: HttpMethod, body: object | object[] | null, params: Record<string, unknown>, clientData: ClientData): Promise<ApiRequest>;
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

interface BulkResult<T = unknown> {
    readonly items: T[];
    readonly errors: {
        message: string;
        code: number;
        [key: string]: unknown;
    }[];
}

interface CursorPaginatedResult$1<T = unknown> extends PaginatedResult$1<T> {
    readonly nextCursor: string | null;
    hasNextCursor(): boolean;
}

declare class PaginatedResult<T> implements PaginatedResult$1 {
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

declare class CursorPaginatedResult<T> extends PaginatedResult<T> implements CursorPaginatedResult$1 {
    nextCursor: string | null;
    constructor(items: T[], headers: Headers);
    hasNextCursor(): boolean;
}

type ResolveHandler<T> = (json: Record<string, unknown>, headers: Headers) => T;
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
    protected doList(params: Record<string, unknown>): Promise<PaginatedResult<ElementType> | ElementType[]>;
    /**
     * Perform a GET request that expects a cursor-paginated list of items.
     * @param params Optional query or request parameters.
     * @returns A promise resolving to a CursorPaginatedResult of ElementType.
     */
    protected doListCursor(params: Record<string, unknown>): Promise<CursorPaginatedResult<ElementType>>;
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
    protected populateArrayFromJson(json: Record<string, unknown>, headers: Headers): PaginatedResult<ElementType> | ElementType[];
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
    protected populateArrayFromJsonCursor(json: Record<string, unknown>, headers: Headers): CursorPaginatedResult<ElementType>;
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
    protected returnBareJSON<T>(json: Record<string, unknown> | Record<string, unknown>[], _headers: Headers): T;
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
    protected prepareRequest(method: HttpMethod, body: object | object[] | null, params: Record<string, unknown>, uri: string | null): Promise<ApiRequest>;
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
}

declare class Branches extends BaseCollection<Branch> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Branch;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult$1<Branch>>;
    create(branch_params: BranchParams, request_params: ProjectOnly): Promise<Branch>;
    get(branch_id: string | number, request_params: ProjectOnly): Promise<Branch>;
    update(branch_id: string | number, branch_params: BranchParams, request_params: ProjectOnly): Promise<Branch>;
    delete(branch_id: string | number, request_params: ProjectOnly): Promise<BranchDeleted>;
    merge(branch_id: string | number, request_params: ProjectOnly, body?: MergeBranchParams): Promise<BranchMerged>;
}

interface Comment$1 {
    comment_id: number;
    key_id: number;
    comment: string;
    added_by: number;
    added_by_email: string;
    added_at: string;
    added_at_timestamp: number;
}

declare class Comment extends BaseModel implements Comment$1 {
    comment_id: number;
    key_id: number;
    comment: string;
    added_by: number;
    added_by_email: string;
    added_at: string;
    added_at_timestamp: number;
}

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

declare class Comments extends BaseCollection<Comment> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Comment;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: KeyProjectPagination): Promise<PaginatedResult$1<Comment>>;
    create(comment_params: CommentData | CommentData[], request_params: ProjectAndKey): Promise<Comment[]>;
    get(comment_id: string | number, request_params: ProjectAndKey): Promise<Comment>;
    delete(comment_id: string | number, request_params: ProjectAndKey): Promise<CommentDeleted>;
    list_project_comments(params: ProjectWithPagination): Promise<PaginatedResult$1<Comment>>;
}

interface Contributor$1 {
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

declare class Contributor extends BaseModel implements Contributor$1 {
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

type ContributorRights = "activity" | "branches_create" | "branches_main_modify" | "branches_merge" | "contributors" | "custom_status_modify" | "download" | "glossary" | "glossary_delete" | "glossary_edit" | "keys" | "manage_languages" | "review" | "screenshots" | "settings" | "statistics" | "tasks" | "upload";

type ContributorRoles = 1 | 2 | 3 | 4 | 5;

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

declare class Contributors extends BaseCollection<Contributor> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Contributor;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult$1<Contributor>>;
    create(contributor_params: ContributorCreateData | ContributorCreateData[], request_params: ProjectOnly): Promise<Contributor[]>;
    get(contributor_id: string | number, request_params: ProjectOnly): Promise<Contributor>;
    me(request_params: ProjectOnly): Promise<Contributor>;
    update(contributor_id: string | number, contributor_params: ContributorUpdateData, request_params: ProjectOnly): Promise<Contributor>;
    delete(contributor_id: string | number, request_params: ProjectOnly): Promise<ContributorDeleted>;
}

interface File$1 {
    file_id: number;
    filename: string;
    key_count: number;
}

declare class File extends BaseModel implements File$1 {
    file_id: number;
    filename: string;
    key_count: number;
}

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

interface QueuedProcess$1 {
    process_id: string;
    type: string;
    status: string;
    message: string;
    created_by: string;
    created_by_email: string;
    created_at: string;
    created_at_timestamp: number;
    details: QueuedProcessDetails;
}

declare class QueuedProcess extends BaseModel implements QueuedProcess$1 {
    process_id: string;
    type: string;
    status: string;
    message: string;
    created_by: string;
    created_by_email: string;
    created_at: string;
    created_at_timestamp: number;
    details: QueuedProcessDetails;
}

type FileFormat = "android_sdk" | "arb" | "csv" | "docx" | "flutter_sdk" | "html" | "ini" | "ios_sdk" | "js" | "json" | "json_structured" | "offline_xliff" | "php_array" | "php_laravel" | "plist" | "po" | "properties" | "react_native" | "resx" | "ruby_yaml" | "stf" | "strings" | "symfony_xliff" | "ts" | "xlf" | "xliff" | "xlsx" | "xml" | "yaml";

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

declare class Files extends BaseCollection<File, QueuedProcess> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => File;
    protected get rootElementName(): string;
    protected get secondaryElementClass(): new (json: Record<string, unknown>) => QueuedProcess;
    protected get secondaryElementNameSingular(): string;
    protected returnBareJSON<T>(json: Record<string, unknown> | Record<string, unknown>[], headers: Headers): T;
    list(request_params: ListFileParams): Promise<PaginatedResult$1<File>>;
    upload(project_id: string, upload: UploadFileParams): Promise<QueuedProcess>;
    download(project_id: string, download: DownloadFileParams): Promise<DownloadBundle>;
    async_download(project_id: string, download: DownloadFileParams): Promise<QueuedProcess>;
    delete(file_id: string | number, request_params: ProjectOnly): Promise<FileDeleted>;
}

interface GlossaryTerm$1 {
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

declare class GlossaryTerm extends BaseModel implements GlossaryTerm$1 {
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

declare class GlossaryTerms extends BaseCollection<GlossaryTerm> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => GlossaryTerm;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    get(term_id: string | number, request_params: ProjectOnly): Promise<GlossaryTerm>;
    list(request_params: ListTermsParams): Promise<CursorPaginatedResult$1<GlossaryTerm>>;
    create(term_params: CreateTermsParams, request_params: ProjectOnly): Promise<BulkResult<GlossaryTerm>>;
    update(term_params: UpdateTermsParams, request_params: ProjectOnly): Promise<BulkResult<GlossaryTerm>>;
    delete(term_ids: number[], request_params: ProjectOnly): Promise<TermsDeleted>;
    private populateFromBulkDelete;
}

interface Jwt$2 {
    jwt: string;
}

declare class Jwt$1 extends BaseModel implements Jwt$2 {
    jwt: string;
}

declare class Jwt extends BaseCollection<Jwt$1> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Jwt$1;
    create(project_id: string, body?: {
        service: string;
    }): Promise<Jwt$1>;
}

interface Screenshot$1 {
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

interface TranslationStatus$1 {
    status_id: number;
    title: string;
    color: string;
}

interface Translation$1 {
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
    custom_translation_statuses: TranslationStatus$1[];
    task_id: number;
    segment_number: number;
}

type Filenames = {
    ios?: string | null;
    android?: string | null;
    web?: string | null;
    other?: string | null;
};

type SupportedPlatforms = "ios" | "android" | "web" | "other";

type KeyComment$1 = Omit<Comment$1, "key_id">;
interface Key$1 {
    key_id: number;
    created_at: string;
    created_at_timestamp: number;
    key_name: Filenames;
    filenames: Filenames;
    description: string;
    platforms: SupportedPlatforms[];
    tags: string[];
    comments: KeyComment$1[];
    screenshots: Screenshot$1[];
    translations: Translation$1[];
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

type KeyComment = Omit<Comment$1, "key_id">;
declare class Key extends BaseModel implements Key$1 {
    key_id: number;
    created_at: string;
    created_at_timestamp: number;
    key_name: Filenames;
    filenames: Filenames;
    description: string;
    platforms: SupportedPlatforms[];
    tags: string[];
    comments: KeyComment[];
    screenshots: Screenshot$1[];
    translations: Translation$1[];
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

type NumericBool = 0 | 1;

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

declare class Keys extends BaseCollection<Key> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Key;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: KeyParamsWithPagination): Promise<CursorPaginatedResult$1<Key>>;
    create(key_params: CreateKeyParams, request_params: ProjectOnly): Promise<BulkResult<Key>>;
    get(key_id: string | number, request_params: GetKeyParams): Promise<Key>;
    update(key_id: string | number, key_params: UpdateKeyData, request_params: ProjectOnly): Promise<Key>;
    delete(key_id: string | number, request_params: ProjectOnly): Promise<KeyDeleted>;
    bulk_update(key_params: BulkUpdateKeyParams, request_params: ProjectOnly): Promise<BulkResult<Key>>;
    bulk_delete(key_ids: number[] | string[], request_params: ProjectOnly): Promise<KeysBulkDeleted>;
}

interface Language$1 {
    lang_id: number;
    lang_iso: string;
    lang_name: string;
    is_rtl: boolean;
    plural_forms: string[];
    project_language_uuid?: string;
}

declare class Language extends BaseModel implements Language$1 {
    lang_id: number;
    lang_iso: string;
    lang_name: string;
    is_rtl: boolean;
    plural_forms: string[];
    project_language_uuid?: string;
}

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

declare class Languages extends BaseCollection<Language> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Language;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    system_languages(params?: PaginationParams): Promise<PaginatedResult$1<Language>>;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult$1<Language>>;
    create(raw_body: CreateLanguageParams | CreateLanguageParams[], request_params: ProjectOnly): Promise<BulkResult<Language>>;
    get(lang_id: string | number, request_params: ProjectOnly): Promise<Language>;
    update(lang_id: string | number, lang_params: UpdateLanguageParams, request_params: ProjectOnly): Promise<Language>;
    delete(lang_id: string | number, request_params: ProjectOnly): Promise<LanguageDeleted>;
}

interface Order$1 {
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

declare class Order extends BaseModel implements Order$1 {
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

type TeamWithPagination = TeamOnly & PaginationParams;

declare class Orders extends BaseCollection<Order> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Order;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: TeamWithPagination): Promise<PaginatedResult$1<Order>>;
    create(order_params: CreateOrderParams, request_params: TeamOnly): Promise<Order>;
    get(order_id: string | number, request_params: TeamOnly): Promise<Order>;
}

interface PaymentCard$1 {
    card_id: number;
    last4: string;
    brand: string;
    created_at: string;
    created_at_timestamp: number;
}

declare class PaymentCard extends BaseModel implements PaymentCard$1 {
    card_id: number;
    last4: string;
    brand: string;
    created_at: string;
    created_at_timestamp: number;
}

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

declare class PaymentCards extends BaseCollection<PaymentCard> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => PaymentCard;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params?: PaginationParams): Promise<PaginatedResult$1<PaymentCard>>;
    create(card_params: CreateCardParams): Promise<PaymentCard>;
    get(card_id: string | number): Promise<PaymentCard>;
    delete(card_id: string | number): Promise<CardDeleted>;
}

interface AuthData {
    client_id: string;
    client_secret: string;
    host?: string;
    version?: string;
}

interface IAuthError {
    code: number;
    error: string;
    error_description: string;
    error_uri?: string;
}

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

interface OtaBundle$1 {
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

interface OtaBundleArchive$1 {
    url: string;
    version: number;
}

interface OtaFreezePeriod$1 {
    id: number;
    projectId: number;
    bundleId: number;
    framework: string;
    from: string;
    to: string;
}

interface OtaSdkToken$1 {
    id: number;
    token: string;
    projectId: number;
    lokaliseId: number;
    createdAt: string;
}

interface OtaStatistics$1 {
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

interface Project$1 {
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

interface RefreshTokenResponse {
    access_token: string;
    scope: string;
    expires_in: string | number;
    token_type: string;
}

interface RequestTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: string | number;
    token_type: string;
}

interface Segment$1 {
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

interface Snapshot$1 {
    snapshot_id: number;
    title: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
}

interface Task$1 {
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

interface Team$1 {
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

interface TeamUser$1 {
    user_id: number;
    email: string;
    fullname: string;
    created_at: string;
    created_at_timestamp: number;
    role: string;
    uuid?: string;
}

interface TeamUserBillingDetails$2 {
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

interface TranslationProvider$1 {
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

interface UserGroup$1 {
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

interface Webhook$1 {
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

type CreateProjectParams = {
    name: string;
    team_id?: number | string;
    description?: string;
    languages?: Array<{
        lang_iso: string;
        custom_iso?: string;
    }>;
    base_lang_iso?: string;
    project_type?: "localization_files" | "paged_documents" | "marketing" | "marketing_integrations";
    is_segmentation_enabled?: boolean;
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

type CreateSnapshotParams = {
    title: string;
};
type SnapshotDeleted = {
    project_id: string;
    snapshot_deleted: boolean;
    branch?: string;
};

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

type TeamUserParams = {
    role?: "owner" | "admin" | "member" | "biller";
};
type TeamUserDeleted = {
    team_id: string;
    team_user_deleted: boolean;
};

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

declare class PermissionTemplates extends BaseCollection<PermissionTemplate> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => PermissionTemplate;
    protected get rootElementName(): string;
    list(request_params: TeamOnly): Promise<PaginatedResult$1<PermissionTemplate>>;
}

declare class Project extends BaseModel implements Project$1 {
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

declare class Projects extends BaseCollection<Project> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Project;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params?: ProjectListParams): Promise<PaginatedResult$1<Project>>;
    create(project_params: CreateProjectParams): Promise<Project>;
    get(project_id: string): Promise<Project>;
    update(project_id: string, project_params: UpdateProjectParams): Promise<Project>;
    delete(project_id: string): Promise<ProjectDeleted>;
    empty(project_id: string): Promise<ProjectEmptied>;
}

declare class QueuedProcesses extends BaseCollection<QueuedProcess> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => QueuedProcess;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult$1<QueuedProcess>>;
    get(process_id: string | number, request_params: ProjectOnly): Promise<QueuedProcess>;
}

declare class Screenshot extends BaseModel implements Screenshot$1 {
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

declare class Screenshots extends BaseCollection<Screenshot> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Screenshot;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult$1<Screenshot>>;
    create(raw_body: CreateScreenshotParams | CreateScreenshotParams[], request_params: ProjectOnly): Promise<BulkResult<Screenshot>>;
    get(screnshot_id: string | number, request_params: ProjectOnly): Promise<Screenshot>;
    update(screenshot_id: string | number, screenshot_params: UpdateScreenshotParams, request_params: ProjectOnly): Promise<Screenshot>;
    delete(screenshot_id: string | number, request_params: ProjectOnly): Promise<ScreenshotDeleted>;
}

declare class TranslationStatus extends BaseModel implements TranslationStatus$1 {
    status_id: number;
    title: string;
    color: string;
}

declare class Segment extends BaseModel implements Segment$1 {
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

declare class Segments extends BaseCollection<Segment> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Segment;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: ListSegmentParams): Promise<Segment[]>;
    get(segment_number: string | number, request_params: GetSegmentParams): Promise<Segment>;
    update(segment_number: string | number, segment_params: UpdateSegmentBodyParams, request_params: UpdateSegmentReqParams): Promise<Segment>;
}

declare class Snapshot extends BaseModel implements Snapshot$1 {
    snapshot_id: number;
    title: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
}

declare class Snapshots extends BaseCollection<Snapshot> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Snapshot;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult$1<Snapshot>>;
    create(snapshot_params: CreateSnapshotParams, request_params: ProjectOnly): Promise<Snapshot>;
    restore(snapshot_id: string | number, request_params: ProjectOnly): Promise<Project>;
    delete(snapshot_id: string | number, request_params: ProjectOnly): Promise<SnapshotDeleted>;
}

declare class Task extends BaseModel implements Task$1 {
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

declare class Tasks extends BaseCollection<Task> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Task;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: ListTaskParams): Promise<PaginatedResult$1<Task>>;
    create(task_params: CreateTaskParams, request_params: ProjectOnly): Promise<Task>;
    get(task_id: string | number, request_params: ProjectOnly): Promise<Task>;
    update(task_id: string | number, task_params: UpdateTaskParams, request_params: ProjectOnly): Promise<Task>;
    delete(task_id: string | number, request_params: ProjectOnly): Promise<TaskDeleted>;
}

declare class TeamUserBillingDetails$1 extends BaseModel implements TeamUserBillingDetails$2 {
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

declare class TeamUserBillingDetails extends BaseCollection<TeamUserBillingDetails$1> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => TeamUserBillingDetails$1;
    get(team_id: string | number): Promise<TeamUserBillingDetails$1>;
    create(billing_details_params: BillingDetailsParams, request_params: TeamOnly): Promise<TeamUserBillingDetails$1>;
    update(team_id: string | number, billing_details_params: BillingDetailsParams): Promise<TeamUserBillingDetails$1>;
}

declare class TeamUser extends BaseModel implements TeamUser$1 {
    user_id: number;
    email: string;
    fullname: string;
    created_at: string;
    created_at_timestamp: number;
    role: string;
    uuid?: string;
}

declare class TeamUsers extends BaseCollection<TeamUser> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => TeamUser;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: TeamWithPagination): Promise<PaginatedResult$1<TeamUser>>;
    get(team_user_id: string | number, request_params: TeamOnly): Promise<TeamUser>;
    update(team_user_id: string | number, team_user_params: TeamUserParams, request_params: TeamOnly): Promise<TeamUser>;
    delete(team_user_id: string | number, request_params: TeamOnly): Promise<TeamUserDeleted>;
}

declare class Team extends BaseModel implements Team$1 {
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

declare class Teams extends BaseCollection<Team> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Team;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params?: PaginationParams): Promise<PaginatedResult$1<Team>>;
    get(id: number | string): Promise<Team>;
}

declare class TranslationProvider extends BaseModel implements TranslationProvider$1 {
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

declare class TranslationProviders extends BaseCollection<TranslationProvider> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => TranslationProvider;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: TeamWithPagination): Promise<PaginatedResult$1<TranslationProvider>>;
    get(provider_id: string | number, request_params: TeamOnly): Promise<TranslationProvider>;
}

declare class TranslationStatuses extends BaseCollection<TranslationStatus> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => TranslationStatus;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult$1<TranslationStatus>>;
    create(translation_status_params: CreateTranslationStatusParams, request_params: ProjectOnly): Promise<TranslationStatus>;
    get(translation_status_id: string | number, request_params: ProjectOnly): Promise<TranslationStatus>;
    update(translation_status_id: string | number, translation_status_params: UpdateTranslationStatusParams, request_params: ProjectOnly): Promise<TranslationStatus>;
    delete(translation_status_id: string | number, request_params: ProjectOnly): Promise<TranslationStatusDeleted>;
    available_colors(request_params: ProjectOnly): Promise<TranslationStatusColors>;
}

declare class Translation extends BaseModel implements Translation$1 {
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
    custom_translation_statuses: TranslationStatus$1[];
    task_id: number;
    segment_number: number;
}

declare class Translations extends BaseCollection<Translation> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Translation;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: ListTranslationParams): Promise<CursorPaginatedResult$1<Translation>>;
    get(translation_id: string | number, request_params: GetTranslationParams): Promise<Translation>;
    update(translation_id: string | number, translation_params: UpdateTranslationParams, request_params: ProjectOnly): Promise<Translation>;
}

declare class UserGroup extends BaseModel implements UserGroup$1 {
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

declare class UserGroups extends BaseCollection<UserGroup> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => UserGroup;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: TeamWithPagination): Promise<PaginatedResult$1<UserGroup>>;
    create(user_group_params: UserGroupParams, request_params: TeamOnly): Promise<UserGroup>;
    get(user_group_id: string | number, request_params: TeamOnly): Promise<UserGroup>;
    update(user_group_id: string | number, user_group_params: UserGroupParams, request_params: TeamOnly): Promise<UserGroup>;
    delete(user_group_id: string | number, request_params: TeamOnly): Promise<UserGroupDeleted>;
    add_members_to_group(team_id: string | number, group_id: string | number, user_ids: string[] | number[]): Promise<UserGroup>;
    remove_members_from_group(team_id: string | number, group_id: string | number, user_ids: string[] | number[]): Promise<UserGroup>;
    add_projects_to_group(team_id: string | number, group_id: string | number, project_ids: string[] | number[]): Promise<UserGroup>;
    remove_projects_from_group(team_id: string | number, group_id: string | number, project_ids: string[] | number[]): Promise<UserGroup>;
    protected populateGroupFromJsonRoot(json: Record<string, unknown>, headers: Headers): UserGroup;
}

declare class Webhook extends BaseModel implements Webhook$1 {
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

declare class Webhooks extends BaseCollection<Webhook> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Webhook;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult$1<Webhook>>;
    create(webhook_params: CreateWebhookParams, request_params: ProjectOnly): Promise<Webhook>;
    get(webhook_id: string | number, request_params: ProjectOnly): Promise<Webhook>;
    update(webhook_id: string | number, webhook_params: UpdateWebhookParams, request_params: ProjectOnly): Promise<Webhook>;
    delete(webhook_id: string | number, request_params: ProjectOnly): Promise<WebhookDeleted>;
    regenerate_secret(webhook_id: string | number, request_params: ProjectOnly): Promise<WebhookRegenerated>;
}

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
    constructor({ apiKey, enableCompression, silent, tokenType, host, requestTimeout, userAgent, }: ClientParams);
}

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
    jwt(): Jwt;
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
    teamUserBillingDetails(): TeamUserBillingDetails;
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

declare class OtaBundle extends BaseModel implements OtaBundle$1 {
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

declare abstract class OtaCollection<ElementType, SecondaryType = ElementType> extends BaseCollection<ElementType, SecondaryType> {
    protected doDelete<T = Record<string, unknown> | Record<string, unknown>[]>(id: string | number, req_params: Record<string, unknown>): Promise<T>;
    protected returnJSONFromData(json: Record<string, unknown>): Record<string, unknown> | Array<Record<string, unknown>>;
    protected createVoidPromise(method: HttpMethod, params: Record<string, unknown>, body: object | object[] | null, uri?: string | null): Promise<null>;
}

declare class OtaBundleManagement extends OtaCollection<OtaBundle> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => OtaBundle;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: OtaTeamProject): Promise<OtaBundle[]>;
    get(bundleId: string | number, requestParams: OtaTeamProject): Promise<OtaBundle>;
    update(bundleId: string | number, bundleParams: OtaBundleUpdateData, requestParams: OtaTeamProject): Promise<OtaBundle>;
    delete(bundleId: string | number, requestParams: OtaTeamProject): Promise<OtaResourceDeleted>;
}

declare class OtaBundlePublishing extends OtaCollection<void> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => Branch;
    publish(bundleId: number | string, request_params: OtaTeamProjectFramework): Promise<null>;
    stage(bundleId: number | string, request_params: OtaTeamProjectFramework): Promise<null>;
}

declare class OtaBundleArchive extends BaseModel implements OtaBundleArchive$1 {
    url: string;
    version: number;
}

declare class OtaBundles extends OtaCollection<OtaBundleArchive> {
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaBundleArchive;
    protected get elementClass(): new (json: Record<string, unknown>) => OtaBundleArchive;
    protected get rootElementNameSingular(): string;
    get(bundle_params: OtaRequestBundleParams, request_params: OtaProjectFramework): Promise<OtaBundleArchive>;
}

declare class OtaFreezePeriod extends BaseModel implements OtaFreezePeriod$1 {
    id: number;
    projectId: number;
    bundleId: number;
    framework: string;
    from: string;
    to: string;
}

declare class OtaFreezePeriods extends OtaCollection<OtaFreezePeriod> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => OtaFreezePeriod;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(requestParams: OtaTeamProjectFramework): Promise<OtaFreezePeriod[]>;
    create(freezeParams: OtaFreezePeriodParams, requestParams: OtaTeamProject): Promise<OtaFreezePeriod>;
    update(freezeId: string | number, freezeParams: OtaFreezePeriodParams, requestParams: OtaTeamProject): Promise<OtaFreezePeriod>;
    delete(freezeId: string | number, requestParams: OtaTeamProject): Promise<OtaResourceDeleted>;
}

declare class OtaSdkToken extends BaseModel implements OtaSdkToken$1 {
    id: number;
    token: string;
    projectId: number;
    lokaliseId: number;
    createdAt: string;
}

declare class OtaSdkTokens extends OtaCollection<OtaSdkToken> {
    protected static prefixURI: string;
    protected get elementClass(): new (json: Record<string, unknown>) => OtaSdkToken;
    protected get rootElementName(): string;
    protected get rootElementNameSingular(): string | null;
    list(request_params: OtaTeamProject): Promise<OtaSdkToken[]>;
    create(request_params: OtaTeamProject): Promise<OtaSdkToken>;
    delete(tokenId: string | number, request_params: OtaTeamProject): Promise<OtaResourceDeleted>;
}

declare class OtaStatistics extends BaseModel implements OtaStatistics$1 {
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

declare class OtaUsageStatistics extends OtaCollection<OtaStatistics> {
    protected static prefixURI: string;
    protected static elementClass: typeof OtaStatistics;
    protected get elementClass(): new (json: Record<string, unknown>) => OtaStatistics;
    get(bundle_params: OtaUsageParams, request_params: OtaTeamProject): Promise<OtaStatistics>;
}

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

declare class AuthError extends BaseModel implements IAuthError {
    code: number;
    error: string;
    error_description: string;
    error_uri?: string;
}

export { ApiError, type AuthData, AuthError, type BillingDetailsParams, type Branch$1 as Branch, type BranchDeleted, type BranchMerged, type BranchParams, type BulkResult, type BulkUpdateKeyParams, type CardDeleted, type ClientData, type ClientParams, type Comment$1 as Comment, type CommentData, type CommentDeleted, type Contributor$1 as Contributor, type ContributorCreateData, type ContributorDeleted, type ContributorLanguages, type ContributorRights, type ContributorRoles, type ContributorUpdateData, type CreateCardParams, type CreateKeyData, type CreateKeyParams, type CreateLanguageParams, type CreateOrderParams, type CreateProjectParams, type CreateScreenshotParams, type CreateSnapshotParams, type CreateTaskParams, type CreateTermsParams, type CreateTranslationStatusParams, type CreateWebhookParams, type CursorPaginatedResult$1 as CursorPaginatedResult, type CursorPagination, type DownloadBundle, type DownloadFileParams, type DownloadedFileProcessDetails, type File$1 as File, type FileDeleted, type FileFormat, type Filenames, type GetKeyParams, type GetSegmentParams, type GetTranslationParams, type GlossaryTerm$1 as GlossaryTerm, type HttpMethod, type IApiError, type IAuthError, type Jwt$2 as Jwt, type Key$1 as Key, type KeyDeleted, type KeyParamsWithPagination, type KeyProjectPagination, type KeysBulkDeleted, type Language$1 as Language, type LanguageDeleted, type ListFileParams, type ListSegmentParams, type ListTaskParams, type ListTermsParams, type ListTranslationParams, LokaliseApi, LokaliseApiOAuth, LokaliseApiOta, LokaliseAuth, LokaliseOtaBundles, type MergeBranchParams, type NumericBool, type Order$1 as Order, type OtaBundle$1 as OtaBundle, type OtaBundleArchive$1 as OtaBundleArchive, type OtaBundleUpdateData, type OtaFramework, type OtaFreezePeriod$1 as OtaFreezePeriod, type OtaFreezePeriodParams, type OtaProjectFramework, type OtaRequestBundleParams, type OtaResourceDeleted, type OtaSdkToken$1 as OtaSdkToken, type OtaStatistics$1 as OtaStatistics, type OtaTeamProject, type OtaTeamProjectFramework, type OtaUsageParams, type PaginatedResult$1 as PaginatedResult, type PaginationParams, type PaymentCard$1 as PaymentCard, type Project$1 as Project, type ProjectAndKey, type ProjectDeleted, type ProjectEmptied, type ProjectListParams, type ProjectOnly, type ProjectSettings, type ProjectStatistics, type ProjectWithPagination, type QueuedProcess$1 as QueuedProcess, type QueuedProcessDetails, type RefreshTokenResponse, type RequestTokenResponse, type Screenshot$1 as Screenshot, type ScreenshotData, type ScreenshotDeleted, type Segment$1 as Segment, type Snapshot$1 as Snapshot, type SnapshotDeleted, type SupportedPlatforms, type Task$1 as Task, type TaskDeleted, type TaskLanguage, type Team$1 as Team, type TeamOnly, type TeamUser$1 as TeamUser, type TeamUserBillingDetails$2 as TeamUserBillingDetails, type TeamUserDeleted, type TeamUserParams, type TeamWithPagination, type TermsDeleted, type Translation$1 as Translation, type TranslationData, type TranslationProvider$1 as TranslationProvider, type TranslationStatus$1 as TranslationStatus, type TranslationStatusColors, type TranslationStatusDeleted, type UpdateKeyData, type UpdateKeyDataWithId, type UpdateLanguageParams, type UpdateProjectParams, type UpdateScreenshotParams, type UpdateSegmentBodyParams, type UpdateSegmentReqParams, type UpdateTaskParams, type UpdateTermsParams, type UpdateTranslationParams, type UpdateTranslationStatusParams, type UpdateWebhookParams, type UploadFileParams, type UploadedFileProcessDetails, type UserGroup$1 as UserGroup, type UserGroupDeleted, type UserGroupParams, type Webhook$1 as Webhook, type WebhookDeleted, type WebhookEventLangMap, type WebhookEvents, type WebhookProjectBranchAdded, type WebhookProjectBranchDeleted, type WebhookProjectBranchMerged, type WebhookProjectContributorAdded, type WebhookProjectContributorAddedPublic, type WebhookProjectContributorDeleted, type WebhookProjectCopied, type WebhookProjectDeleted, type WebhookProjectExported, type WebhookProjectImported, type WebhookProjectKeyAdded, type WebhookProjectKeyCommentAdded, type WebhookProjectKeyModified, type WebhookProjectKeysAdded, type WebhookProjectKeysDeleted, type WebhookProjectKeysModified, type WebhookProjectLanguageRemoved, type WebhookProjectLanguageSettingsChanged, type WebhookProjectLanguagesAdded, type WebhookProjectSnapshotCreated, type WebhookProjectTaskClosed, type WebhookProjectTaskCreated, type WebhookProjectTaskDeleted, type WebhookProjectTaskInitialTmLeverageCalculated, type WebhookProjectTaskLanguageClosed, type WebhookProjectTaskQueued, type WebhookProjectTranslationProofread, type WebhookProjectTranslationUpdated, type WebhookProjectTranslationsProofread, type WebhookProjectTranslationsUpdated, type WebhookRegenerated, type WebhookTeamOrderCompleted, type WebhookTeamOrderCreated, type WebhookTeamOrderDeleted };
