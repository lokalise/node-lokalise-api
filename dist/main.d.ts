interface PaginatedResult$1<T = any> {
    readonly totalResults: number;
    readonly totalPages: number;
    readonly resultsPerPage: number;
    readonly currentPage: number;
    readonly items: T[];
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

declare abstract class BaseModel {
    constructor(params: {
        [key: string]: any;
    });
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
    force_conflict_resolve_using?: string;
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
    host?: string;
    version?: string;
}

interface Keyable {
    readonly [key: string]: any;
}
interface WritableKeyable {
    [key: string]: any;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

declare class ApiRequest {
    promise: Promise<any>;
    params: WritableKeyable;
    protected readonly urlRoot = "https://api.lokalise.com/api2/";
    constructor(uri: string, method: HttpMethod, body: object | object[] | null, params: Keyable, clientData: ClientData);
    protected createPromise(uri: string, method: HttpMethod, body: object | object[] | null, clientData: ClientData): Promise<any>;
    protected fetchAndHandleResponse(target: URL, options: RequestInit): Promise<any>;
    protected processResponse(response: Response): Promise<any>;
    protected buildHeaders(clientData: ClientData, method: HttpMethod, body: object | object[] | null): Promise<Headers>;
    protected getErrorFromResp(respJson: any): any;
    protected composeURI(rawUri: string): string;
    protected mapUriParams(): (_entity: any, isMandaratory: string, paramName: string) => string;
}

interface BulkResult<T = any> {
    readonly items: T[];
    readonly errors: any[];
}

interface ApiError$1 {
    code: number;
    message: string;
}

declare class ApiError extends BaseModel implements ApiError$1 {
    code: number;
    message: string;
}

interface CursorPaginatedResult$1<T = any> extends PaginatedResult$1<T> {
    readonly nextCursor: string | null;
    hasNextCursor(): boolean;
}

declare class PaginatedResult implements PaginatedResult$1 {
    totalResults: number;
    totalPages: number;
    resultsPerPage: number;
    currentPage: number;
    items: any;
    constructor(items: any, headers: Headers);
    hasNextPage(): boolean;
    hasPrevPage(): boolean;
    isLastPage(): boolean;
    isFirstPage(): boolean;
    nextPage(): number;
    prevPage(): number;
    private safeParseInt;
}

declare class CursorPaginatedResult extends PaginatedResult implements CursorPaginatedResult$1 {
    nextCursor: string | null;
    constructor(items: any[], headers: Headers);
    hasNextCursor(): boolean;
}

type RejectHandler = (data: any) => ApiError;
type ResolveHandler = (json: Keyable, headers: Headers, ...args: any[]) => any;
declare abstract class BaseCollection {
    readonly clientData: ClientData;
    protected static rootElementName: string;
    protected static rootElementNameSingular: string | null;
    protected static endpoint: string | null;
    protected static prefixURI: string | null;
    protected static elementClass: any;
    protected static secondaryElementNameSingular: string | null;
    protected static secondaryElementClass: any;
    constructor(clientData: ClientData);
    protected doList(req_params: Keyable): Promise<any>;
    protected doListCursor(req_params: Keyable): Promise<any>;
    protected doGet(id: string | number, req_params?: Keyable): Promise<any>;
    protected doDelete(id: string | number, req_params?: Keyable): Promise<any>;
    protected doCreate(body: Keyable | null, req_params?: Keyable, resolveFn?: (json: Keyable, _headers: Headers, secondary?: boolean) => any): Promise<any>;
    protected doUpdate(id: string | number, body: Keyable | null, req_params: Keyable, resolveFn?: (json: Keyable, headers: Headers) => any, method?: HttpMethod): Promise<any>;
    protected populateObjectFromJsonRoot(json: Keyable, headers: Headers): any;
    protected populateSecondaryObjectFromJsonRoot(json: Keyable, headers: Headers): any;
    protected populateObjectFromJson(json: Keyable, _headers: Headers, secondary?: boolean): any;
    protected populateArrayFromJsonBulk(json: Keyable, headers: Headers): BulkResult | this[];
    protected populateArrayFromJson(json: Keyable, headers: Headers): PaginatedResult | Keyable | this[];
    private populateArray;
    private isPaginated;
    protected populateArrayFromJsonCursor(json: Keyable, headers: Headers): CursorPaginatedResult | Keyable | this[];
    protected populateApiErrorFromJson(json: any): ApiError;
    protected returnBareJSON(json: Keyable | Array<Keyable>): Keyable | Array<Keyable>;
    protected handleReject(data: any): ApiError;
    protected createPromise(method: HttpMethod, params: Keyable, resolveFn: ResolveHandler | null, rejectFn: RejectHandler, body: object | object[] | null, uri?: string | null): Promise<any>;
    protected sendRequest(request: ApiRequest): Promise<any>;
    protected handleError(err: any, rejectFn: RejectHandler): Promise<never>;
    protected prepareRequest(method: HttpMethod, body: object | object[] | null, params: Keyable, uri: string | null): ApiRequest;
    protected getUri(uri: string | null): string;
    protected objToArray(raw_body: Keyable | Keyable[]): Array<Keyable>;
}

declare class Branches extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Branch;
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

declare class Comments extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Comment;
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
}

type ContributorRights = "upload" | "activity" | "download" | "settings" | "create_branches" | "statistics" | "keys" | "screenshots" | "glossary" | "contributors" | "languages" | "tasks";

type ContributorLanguages = {
    lang_iso: string;
    is_writable?: boolean;
};
type ContributorCreateData = {
    email: string;
    fullname?: string;
    is_admin?: boolean;
    is_reviewer?: boolean;
    languages: ContributorLanguages[];
    admin_rights?: ContributorRights[];
};
type ContributorUpdateData = {
    is_admin?: boolean;
    is_reviewer?: boolean;
    languages?: ContributorLanguages[];
    admin_rights?: ContributorRights[];
};
type ContributorDeleted = {
    project_id: string;
    contributor_deleted: boolean;
    branch?: string;
};

declare class Contributors extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Contributor;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult$1<Contributor>>;
    create(contributor_params: ContributorCreateData | ContributorCreateData[], request_params: ProjectOnly): Promise<Contributor[]>;
    get(contributor_id: string | number, request_params: ProjectOnly): Promise<Contributor>;
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

type ProcessDetails$1 = {
    files: Keyable[];
    [key: string]: any;
};
interface QueuedProcess$1 {
    process_id: string;
    type: string;
    status: string;
    message: string;
    created_by: string;
    created_by_email: string;
    created_at: string;
    created_at_timestamp: number;
    details: ProcessDetails$1;
}

type ProcessDetails = {
    files: Keyable[];
    [key: string]: any;
};
declare class QueuedProcess extends BaseModel implements QueuedProcess$1 {
    process_id: string;
    type: string;
    status: string;
    message: string;
    created_by: string;
    created_by_email: string;
    created_at: string;
    created_at_timestamp: number;
    details: ProcessDetails;
}

type FileFormat = "android_sdk" | "ios_sdk" | "flutter_sdk" | "xml" | "strings" | "csv" | "xlsx" | "po" | "properties" | "json" | "json_structured" | "xliff" | "plist" | "resx" | "js" | "react_native" | "symfony_xliff" | "xlf" | "php_array" | "php_laravel" | "ini" | "ruby_yaml" | "yaml" | "stf" | "ts" | "docx" | "html" | "arb" | "offline_xliff";

type DownloadBundle = {
    project_id: string;
    bundle_url: string;
    branch?: string;
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
    java_properties_separator?: string;
    bundle_description?: string;
    filter_task_id?: number;
    compact?: boolean;
}
type UploadFileParams = {
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
};
type ListFileParams = ProjectWithPagination & {
    filter_filename?: string;
};

declare class Files extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof File;
    protected static secondaryElementNameSingular: string;
    protected static secondaryElementClass: typeof QueuedProcess;
    list(request_params: ListFileParams): Promise<PaginatedResult$1<File>>;
    upload(project_id: string, upload: UploadFileParams): Promise<QueuedProcess>;
    download(project_id: string, download: DownloadFileParams): Promise<DownloadBundle>;
    delete(file_id: string | number, request_params: ProjectOnly): Promise<FileDeleted>;
}

interface Jwt$2 {
    jwt: string;
}

declare class Jwt$1 extends BaseModel implements Jwt$2 {
    jwt: string;
}

declare class Jwt extends BaseCollection {
    protected static prefixURI: string;
    protected static elementClass: typeof Jwt$1;
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
    custom_attributes: any[] | string;
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
    custom_attributes: any[] | string;
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
    translation?: string | Keyable;
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
type UpdateKeyData = Omit<CreateKeyData, "key_name" | "platforms"> & {
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

declare class Keys extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Key;
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
}

declare class Language extends BaseModel implements Language$1 {
    lang_id: number;
    lang_iso: string;
    lang_name: string;
    is_rtl: boolean;
    plural_forms: string[];
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

declare class Languages extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Language;
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
    source_words: Keyable;
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
    source_words: Keyable;
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

declare class Orders extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Order;
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

declare class PaymentCards extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof PaymentCard;
    list(request_params?: PaginationParams): Promise<PaginatedResult$1<PaymentCard>>;
    create(card_params: CreateCardParams): Promise<PaymentCard>;
    get(card_id: string | number): Promise<PaymentCard>;
    delete(card_id: string | number): Promise<CardDeleted>;
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
    name: string;
    description: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
    team_id: number;
    base_language_id: number;
    base_language_iso: string;
    settings: ProjectSettings;
    statistics: ProjectStatistics;
}

declare class Project extends BaseModel implements Project$1 {
    project_id: string;
    project_type: string;
    name: string;
    description: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
    team_id: number;
    base_language_id: number;
    base_language_iso: string;
    settings: ProjectSettings;
    statistics: ProjectStatistics;
}

type CreateProjectParams = {
    name: string;
    team_id?: number | string;
    description?: string;
    languages?: Array<{
        lang_iso: string;
        custom_iso?: string;
    }>;
    base_lang_iso?: string;
    project_type?: "localization_files" | "paged_documents";
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

declare class Projects extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Project;
    list(request_params?: ProjectListParams): Promise<PaginatedResult$1<Project>>;
    create(project_params: CreateProjectParams): Promise<Project>;
    get(project_id: string | number): Promise<Project>;
    update(project_id: string | number, project_params: UpdateProjectParams): Promise<Project>;
    delete(project_id: string | number): Promise<ProjectDeleted>;
    empty(project_id: any): Promise<ProjectEmptied>;
}

declare class QueuedProcesses extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof QueuedProcess;
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

declare class Screenshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult$1<Screenshot>>;
    create(raw_body: CreateScreenshotParams | CreateScreenshotParams[], request_params: ProjectOnly): Promise<BulkResult<Screenshot>>;
    get(screnshot_id: string | number, request_params: ProjectOnly): Promise<Screenshot>;
    update(screenshot_id: string | number, screenshot_params: UpdateScreenshotParams, request_params: ProjectOnly): Promise<Screenshot>;
    delete(screenshot_id: string | number, request_params: ProjectOnly): Promise<ScreenshotDeleted>;
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

declare class Segments extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Segment;
    list(request_params: ListSegmentParams): Promise<Segment[]>;
    get(segment_number: string | number, request_params: GetSegmentParams): Promise<Segment>;
    update(segment_number: string | number, segment_params: UpdateSegmentBodyParams, request_params: UpdateSegmentReqParams): Promise<Segment>;
}

interface Snapshot$1 {
    snapshot_id: number;
    title: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
}

declare class Snapshot extends BaseModel implements Snapshot$1 {
    snapshot_id: number;
    title: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
}

type CreateSnapshotParams = {
    title: string;
};
type SnapshotDeleted = {
    project_id: string;
    snapshot_deleted: boolean;
    branch?: string;
};

declare class Snapshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Snapshot;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult$1<Snapshot>>;
    create(snapshot_params: CreateSnapshotParams, request_params: ProjectOnly): Promise<Snapshot>;
    restore(snapshot_id: string | number, request_params: ProjectOnly): Promise<Project>;
    delete(snapshot_id: string | number, request_params: ProjectOnly): Promise<SnapshotDeleted>;
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
    task_type?: string;
    parent_task_id?: string | number;
    closing_tags?: string[];
    do_lock_translations?: boolean;
    custom_translation_status_ids?: string[] | number[];
};
type UpdateTaskParams = Omit<CreateTaskParams, "title" | "keys" | "source_language_iso" | "task_type" | "parent_task_id" | "custom_translation_status_ids"> & {
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
    filter_statuses?: string;
};

declare class Tasks extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Task;
    list(request_params: ListTaskParams): Promise<PaginatedResult$1<Task>>;
    create(task_params: CreateTaskParams, request_params: ProjectOnly): Promise<Task>;
    get(task_id: string | number, request_params: ProjectOnly): Promise<Task>;
    update(task_id: string | number, task_params: UpdateTaskParams, request_params: ProjectOnly): Promise<Task>;
    delete(task_id: string | number, request_params: ProjectOnly): Promise<TaskDeleted>;
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

type BillingDetailsParams = {
    billing_email: string;
    country_code: string;
    zip: string | number;
    state_code?: string;
    address1?: string;
    address2?: string;
    city?: string;
    phone?: string;
    company?: string;
    vatnumber?: string;
};

declare class TeamUserBillingDetails extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof TeamUserBillingDetails$1;
    get(team_id: string | number): Promise<TeamUserBillingDetails$1>;
    create(billing_details_params: BillingDetailsParams, request_params: TeamOnly): Promise<TeamUserBillingDetails$1>;
    update(team_id: string | number, billing_details_params: BillingDetailsParams): Promise<TeamUserBillingDetails$1>;
}

interface TeamUser$1 {
    user_id: number;
    email: string;
    fullname: string;
    created_at: string;
    created_at_timestamp: number;
    role: string;
}

declare class TeamUser extends BaseModel implements TeamUser$1 {
    user_id: number;
    email: string;
    fullname: string;
    created_at: string;
    created_at_timestamp: number;
    role: string;
}

type TeamUserParams = {
    role?: "owner" | "admin" | "member" | "biller";
};
type TeamUserDeleted = {
    team_id: string;
    team_user_deleted: boolean;
};

declare class TeamUsers extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof TeamUser;
    list(request_params: TeamWithPagination): Promise<PaginatedResult$1<TeamUser>>;
    get(team_user_id: string | number, request_params: TeamOnly): Promise<TeamUser>;
    update(team_user_id: string | number, team_user_params: TeamUserParams, request_params: TeamOnly): Promise<TeamUser>;
    delete(team_user_id: string | number, request_params: TeamOnly): Promise<TeamUserDeleted>;
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

declare class Teams extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Team;
    list(request_params?: PaginationParams): Promise<PaginatedResult$1<Team>>;
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

declare class TranslationProviders extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof TranslationProvider;
    list(request_params: TeamWithPagination): Promise<PaginatedResult$1<TranslationProvider>>;
    get(provider_id: string | number, request_params: TeamOnly): Promise<TranslationProvider>;
}

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

declare class TranslationStatuses extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof TranslationStatus;
    protected static rootElementNameSingular: string;
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

declare class Translations extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Translation;
    list(request_params: ListTranslationParams): Promise<CursorPaginatedResult$1<Translation>>;
    get(translation_id: string | number, request_params: GetTranslationParams): Promise<Translation>;
    update(translation_id: string | number, translation_params: UpdateTranslationParams, request_params: ProjectOnly): Promise<Translation>;
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
        role_id: number;
    };
    created_at: string;
    created_at_timestamp: number;
    team_id: number;
    projects: string[] | number[];
    members: number[] | string[];
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
        role_id: number;
    };
    created_at: string;
    created_at_timestamp: number;
    team_id: number;
    projects: string[] | number[];
    members: number[] | string[];
}

type GroupLanguages = {
    reference: string[];
    contributable: string[];
};
type AdminRights = "upload" | "activity" | "download" | "settings" | "create_branches" | "statistics" | "keys" | "screenshots" | "glossary" | "contributors" | "languages" | "tasks";
type UserGroupParams = {
    name: string;
    is_reviewer: boolean;
    is_admin: boolean;
    admin_rights?: AdminRights[];
    languages?: GroupLanguages;
};
type UserGroupDeleted = {
    team_id: string;
    group_deleted: boolean;
};

declare class UserGroups extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof UserGroup;
    list(request_params: TeamWithPagination): Promise<PaginatedResult$1<UserGroup>>;
    create(user_group_params: UserGroupParams, request_params: TeamOnly): Promise<UserGroup>;
    get(user_group_id: string | number, request_params: TeamOnly): Promise<UserGroup>;
    update(user_group_id: string | number, user_group_params: UserGroupParams, request_params: TeamOnly): Promise<UserGroup>;
    delete(user_group_id: string | number, request_params: TeamOnly): Promise<UserGroupDeleted>;
    add_members_to_group(team_id: string | number, group_id: string | number, user_ids: string[] | number[]): Promise<UserGroup>;
    remove_members_from_group(team_id: string | number, group_id: string | number, user_ids: string[] | number[]): Promise<UserGroup>;
    add_projects_to_group(team_id: string | number, group_id: string | number, project_ids: string[] | number[]): Promise<UserGroup>;
    remove_projects_from_group(team_id: string | number, group_id: string | number, project_ids: string[] | number[]): Promise<UserGroup>;
    protected populateGroupFromJsonRoot(json: Keyable, headers: Headers): this;
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

type WebhookEventLangMap = {
    event?: string;
    lang_iso_codes?: string[];
};
type CreateWebhookParams = {
    url: string;
    branch?: string;
    events: string[];
    event_lang_map?: WebhookEventLangMap[];
};
type UpdateWebhookParams = Omit<CreateWebhookParams, "url" | "events"> & {
    url?: string;
    events?: string[];
};
type WebhookDeleted = {
    project_id: string;
    webhook_deleted: boolean;
};
type WebhookRegenerated = {
    project_id: string;
    secret: string;
};

declare class Webhooks extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Webhook;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult$1<Webhook>>;
    create(webhook_params: CreateWebhookParams, request_params: ProjectOnly): Promise<Webhook>;
    get(webhook_id: string | number, request_params: ProjectOnly): Promise<Webhook>;
    update(webhook_id: string | number, webhook_params: UpdateWebhookParams, request_params: ProjectOnly): Promise<Webhook>;
    delete(webhook_id: string | number, request_params: ProjectOnly): Promise<WebhookDeleted>;
    regenerate_secret(webhook_id: string | number, request_params: ProjectOnly): Promise<WebhookRegenerated>;
}

type ClientParams = {
    apiKey?: string;
    enableCompression?: boolean;
    tokenType?: string;
    host?: string;
    version?: string;
};
declare class BaseClient {
    readonly clientData: ClientData;
    constructor(params: ClientParams);
}

interface PermissionTemplate$1 {
    id: number;
    role: string;
    permissions: string[];
    description: string;
    tag: string;
    tagColor: string;
    doesEnableAllReadOnlyLanguages: boolean;
}

declare class PermissionTemplate extends BaseModel implements PermissionTemplate$1 {
    id: number;
    role: string;
    permissions: string[];
    description: string;
    tag: string;
    tagColor: string;
    doesEnableAllReadOnlyLanguages: boolean;
}

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

type WebhookProjectTaskQueued = {
    event: "project.task.queued";
    task: {
        id: number;
        type: string;
        title: string;
        due_date: string;
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

type WebhookProjectTaskCreated = {
    event: "project.task.created";
    task: {
        id: number;
        type: string;
        title: string;
        due_date: string;
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

type WebhookProjectTaskClosed = {
    event: "project.task.closed";
    task: {
        id: number;
        type: string;
        title: string;
        due_date: string;
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
        due_date: string;
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
        due_date: string;
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

interface AuthData {
    client_id: string;
    client_secret: string;
    host?: string;
    version?: string;
}

interface AuthError {
    code: number;
    error: string;
    error_description: string;
    error_uri?: string;
}

interface RefreshTokenResponse {
    access_token: string;
    scope: string;
    expires_in: string | number;
    token_type: string;
}

interface RequestTokenResponse$1 {
    access_token: string;
    refresh_token: string;
    expires_in: string | number;
    token_type: string;
}

interface OtaSdkToken$1 {
    id: number;
    token: string;
    projectId: number;
    lokaliseId: number;
    createdAt: string;
}

interface OtaApiError {
    statusCode: string;
    message: string;
    error: string;
}

interface OtaBundleArchive$1 {
    url: string;
    version: number;
}

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

interface OtaFreezePeriod$1 {
    id: number;
    projectId: number;
    bundleId: number;
    framework: string;
    from: string;
    to: string;
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

declare class PermissionTemplates extends BaseCollection {
    protected static prefixURI: string;
    protected static elementClass: typeof PermissionTemplate;
    protected static rootElementName: string;
    list(request_params: TeamOnly): Promise<PaginatedResult$1<PermissionTemplate>>;
}

declare class LokaliseApi extends BaseClient {
    constructor(params: ClientParams);
    branches(): Branches;
    comments(): Comments;
    contributors(): Contributors;
    files(): Files;
    jwt(): Jwt;
    keys(): Keys;
    languages(): Languages;
    orders(): Orders;
    paymentCards(): PaymentCards;
    projects(): Projects;
    queuedProcesses(): QueuedProcesses;
    screenshots(): Screenshots;
    segments(): Segments;
    snapshots(): Snapshots;
    tasks(): Tasks;
    teams(): Teams;
    teamUsers(): TeamUsers;
    teamUserBillingDetails(): TeamUserBillingDetails;
    translations(): Translations;
    translationProviders(): TranslationProviders;
    translationStatuses(): TranslationStatuses;
    userGroups(): UserGroups;
    permissionTemplates(): PermissionTemplates;
    webhooks(): Webhooks;
}

declare class LokaliseApiOAuth extends LokaliseApi {
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

declare abstract class OtaCollection extends BaseCollection {
    protected populateApiErrorFromJson(json: any): ApiError;
    protected doDelete(id: string | number, req_params: Keyable): Promise<any>;
    protected returnJSONFromData(json: Keyable): Keyable | Array<Keyable>;
}

declare class OtaBundleManagement extends OtaCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaBundle;
    list(request_params: OtaTeamProject): Promise<OtaBundle[]>;
    get(bundleId: string | number, requestParams: OtaTeamProject): Promise<OtaBundle>;
    update(bundleId: string | number, bundleParams: OtaBundleUpdateData, requestParams: OtaTeamProject): Promise<OtaBundle>;
    delete(bundleId: string | number, requestParams: OtaTeamProject): Promise<OtaResourceDeleted>;
}

declare class OtaBundlePublishing extends OtaCollection {
    protected static prefixURI: string;
    publish(bundleId: number | string, request_params: OtaTeamProjectFramework): Promise<void>;
    stage(bundleId: number | string, request_params: OtaTeamProjectFramework): Promise<void>;
}

declare class OtaFreezePeriod extends BaseModel implements OtaFreezePeriod$1 {
    id: number;
    projectId: number;
    bundleId: number;
    framework: string;
    from: string;
    to: string;
}

declare class OtaFreezePeriods extends OtaCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaFreezePeriod;
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

declare class OtaSdkTokens extends OtaCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaSdkToken;
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

declare class OtaUsageStatistics extends OtaCollection {
    protected static prefixURI: string;
    protected static elementClass: typeof OtaStatistics;
    get(bundle_params: OtaUsageParams, request_params: OtaTeamProject): Promise<OtaStatistics>;
}

declare class LokaliseApiOta extends BaseClient {
    constructor(params: ClientParams);
    otaBundleManagement(): OtaBundleManagement;
    otaBundlePublishing(): OtaBundlePublishing;
    otaUsageStatistics(): OtaUsageStatistics;
    otaFreezePeriods(): OtaFreezePeriods;
    otaSdkTokens(): OtaSdkTokens;
}

declare class OtaBundleArchive extends BaseModel implements OtaBundleArchive$1 {
    url: string;
    version: number;
}

declare class OtaBundles extends OtaCollection {
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaBundleArchive;
    get(bundle_params: OtaRequestBundleParams, request_params: OtaProjectFramework): Promise<OtaBundleArchive>;
}

declare class LokaliseOtaBundles extends BaseClient {
    constructor(params: ClientParams);
    otaBundles(): OtaBundles;
}

declare class RequestTokenResponse extends BaseModel implements RequestTokenResponse$1 {
    access_token: string;
    refresh_token: string;
    expires_in: string | number;
    token_type: string;
}

declare class LokaliseAuth {
    authData: AuthData;
    constructor(clientId: string, clientSecret: string, host?: string, version?: string);
    auth(scope: string | string[], redirect_uri?: string, state?: string): string;
    token(code: string): Promise<RequestTokenResponse>;
    refresh(refresh_token: string): Promise<any>;
    private doRequest;
    private buildUrl;
    private base_params;
    private handleReject;
}

export { type ApiError$1 as ApiError, type AuthData, type AuthError, type BillingDetailsParams, type Branch$1 as Branch, type BranchDeleted, type BranchMerged, type BranchParams, type BulkResult, type BulkUpdateKeyParams, type CardDeleted, type ClientData, type Comment$1 as Comment, type CommentData, type CommentDeleted, type Contributor$1 as Contributor, type ContributorCreateData, type ContributorDeleted, type ContributorLanguages, type ContributorRights, type ContributorUpdateData, type CreateCardParams, type CreateKeyData, type CreateKeyParams, type CreateLanguageParams, type CreateOrderParams, type CreateProjectParams, type CreateScreenshotParams, type CreateSnapshotParams, type CreateTaskParams, type CreateTranslationStatusParams, type CreateWebhookParams, type CursorPaginatedResult$1 as CursorPaginatedResult, type CursorPagination, type DownloadBundle, type DownloadFileParams, type File$1 as File, type FileDeleted, type Filenames, type GetKeyParams, type GetSegmentParams, type GetTranslationParams, type HttpMethod, type Jwt$2 as Jwt, type Key$1 as Key, type KeyDeleted, type KeyParamsWithPagination, type KeyProjectPagination, type KeysBulkDeleted, type Language$1 as Language, type LanguageDeleted, type ListFileParams, type ListSegmentParams, type ListTaskParams, type ListTranslationParams, LokaliseApi, LokaliseApiOAuth, LokaliseApiOta, LokaliseAuth, LokaliseOtaBundles, type MergeBranchParams, type NumericBool, type Order$1 as Order, type OtaApiError, type OtaBundle$1 as OtaBundle, type OtaBundleArchive$1 as OtaBundleArchive, type OtaBundleUpdateData, type OtaFramework, type OtaFreezePeriod$1 as OtaFreezePeriod, type OtaFreezePeriodParams, type OtaProjectFramework, type OtaRequestBundleParams, type OtaResourceDeleted, type OtaSdkToken$1 as OtaSdkToken, type OtaStatistics$1 as OtaStatistics, type OtaTeamProject, type OtaTeamProjectFramework, type OtaUsageParams, type PaginatedResult$1 as PaginatedResult, type PaginationParams, type PaymentCard$1 as PaymentCard, type Project$1 as Project, type ProjectAndKey, type ProjectDeleted, type ProjectEmptied, type ProjectListParams, type ProjectOnly, type ProjectSettings, type ProjectStatistics, type ProjectWithPagination, type QueuedProcess$1 as QueuedProcess, type RefreshTokenResponse, type RequestTokenResponse$1 as RequestTokenResponse, type Screenshot$1 as Screenshot, type ScreenshotData, type ScreenshotDeleted, type Segment$1 as Segment, type Snapshot$1 as Snapshot, type SnapshotDeleted, type SupportedPlatforms, type Task$1 as Task, type TaskDeleted, type TaskLanguage, type Team$1 as Team, type TeamOnly, type TeamUser$1 as TeamUser, type TeamUserBillingDetails$2 as TeamUserBillingDetails, type TeamUserDeleted, type TeamUserParams, type TeamWithPagination, type Translation$1 as Translation, type TranslationData, type TranslationProvider$1 as TranslationProvider, type TranslationStatus$1 as TranslationStatus, type TranslationStatusColors, type TranslationStatusDeleted, type UpdateKeyData, type UpdateKeyDataWithId, type UpdateLanguageParams, type UpdateProjectParams, type UpdateScreenshotParams, type UpdateSegmentBodyParams, type UpdateSegmentReqParams, type UpdateTaskParams, type UpdateTranslationParams, type UpdateTranslationStatusParams, type UpdateWebhookParams, type UserGroup$1 as UserGroup, type UserGroupDeleted, type UserGroupParams, type Webhook$1 as Webhook, type WebhookDeleted, type WebhookEventLangMap, type WebhookProjectBranchAdded, type WebhookProjectBranchDeleted, type WebhookProjectBranchMerged, type WebhookProjectContributorAdded, type WebhookProjectContributorAddedPublic, type WebhookProjectContributorDeleted, type WebhookProjectCopied, type WebhookProjectDeleted, type WebhookProjectExported, type WebhookProjectImported, type WebhookProjectKeyAdded, type WebhookProjectKeyCommentAdded, type WebhookProjectKeyModified, type WebhookProjectKeysAdded, type WebhookProjectKeysDeleted, type WebhookProjectKeysModified, type WebhookProjectLanguageRemoved, type WebhookProjectLanguageSettingsChanged, type WebhookProjectLanguagesAdded, type WebhookProjectSnapshotCreated, type WebhookProjectTaskClosed, type WebhookProjectTaskCreated, type WebhookProjectTaskDeleted, type WebhookProjectTaskInitialTmLeverageCalculated, type WebhookProjectTaskLanguageClosed, type WebhookProjectTaskQueued, type WebhookProjectTranslationProofread, type WebhookProjectTranslationUpdated, type WebhookProjectTranslationsProofread, type WebhookProjectTranslationsUpdated, type WebhookRegenerated, type WebhookTeamOrderCompleted, type WebhookTeamOrderCreated, type WebhookTeamOrderDeleted };
