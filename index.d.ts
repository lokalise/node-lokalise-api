import { Options } from "got";

declare module "@lokalise/node-api" {
  export interface ApiError {
    code: number;
    message: string;
  }

  export interface Branch {
    branch_id: number;
    name: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
  }

  export interface Comment {
    comment_id: number;
    key_id: number;
    comment: string;
    added_by: number;
    added_by_email: string;
    added_at: string;
    added_at_timestamp: number;
  }

  export interface Contributor {
    user_id: number;
    email: string;
    fullname: string;
    created_at: string;
    created_at_timestamp: number;
    is_admin: boolean;
    is_reviewer: boolean;
    languages: Keyable;
    admin_rights: string[];
  }

  export interface DownloadFileParams {
    format: string;
    original_filenames?: boolean;
    bundle_structure?: string;
    directory_prefix?: string;
    all_platforms?: boolean;
    filter_langs?: any[];
    filter_data?: any[];
    filter_filenames?: any[];
    add_newline_eof?: boolean;
    custom_translation_status_ids?: any[];
    include_tags?: any[];
    exclude_tags?: any[];
    export_sort?: string;
    export_empty_as?: string;
    include_comments?: boolean;
    include_description?: boolean;
    include_pids?: any[];
    triggers?: string[];
    filter_repositories?: any[];
    replace_breaks?: boolean;
    disable_references?: boolean;
    plural_format?: string;
    placeholder_format?: string;
    webhook_url?: string;
    language_mapping?: object;
    icu_numeric?: boolean;
    escape_percent?: boolean;
    indentation?: string;
    yaml_include_root?: boolean;
    json_unescaped_slashes?: boolean;
    java_properties_encoding?: string;
    java_properties_separator?: string;
    bundle_description?: string;
  }

  export interface File {
    filename: string;
    key_count: number;
  }

  export interface FileParams extends StandartParams {
    filter_filename?: string;
  }

  export interface Key {
    key_id: number;
    created_at: string;
    created_at_timestamp: number;
    key_name: object;
    filenames: object;
    description: string;
    platforms: string[];
    tags: string[];
    comments: object;
    screenshots: object;
    translations: object | object[];
    is_plural: boolean;
    plural_name: string;
    is_hidden: boolean;
    is_archived: boolean;
    context: string;
    base_words: number;
    char_limit: number;
    custom_attributes: any[];
    modified_at: string;
    modified_at_timestamp: number;
    translations_modified_at: string;
    translations_modified_at_timestamp: number;
  }

  export interface Keyable {
    [key: string]: any;
  }

  export interface Language {
    lang_id: number;
    lang_iso: string;
    lang_name: string;
    is_rtl: boolean;
    plural_forms: string[];
  }

  export interface Order {
    order_id: string;
    project_id: string;
    card_id: number;
    status: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
    source_language_iso: string;
    target_language_isos: string[];
    keys: number[];
    source_words: object;
    provider_slug: string;
    translation_style: string;
    translation_tier: number;
    translation_tier_name: string;
    briefing: string;
    total: number;
    payment_method: string;
  }

  export interface PaymentCard {
    card_id: number;
    last4: string;
    brand: string;
    created_at: string;
    created_at_timestamp: number;
  }

  export interface Project {
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
    settings: object;
    statistics: object;
  }

  export interface QueuedProcess {
    process_id: string;
    type: string;
    status: string;
    message: string;
    created_by: string;
    created_by_email: string;
    created_at: string;
    created_at_timestamp: number;
    details?: object[];
  }

  export interface Screenshot {
    screenshot_id: number;
    key_ids: number[];
    url: string;
    title: string;
    description: string;
    screenshot_tags: string[];
    width: number;
    height: number;
    created_at: string;
    created_at_timestamp: number;
  }

  export interface Snapshot {
    snapshot_id: number;
    title: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
  }

  export interface StandartParams {
    page?: number;
    limit?: number;
    [paramName: string]: any;
  }

  export interface Task {
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
    languages: object;
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

  export interface Team {
    team_id: number;
    name: string;
    created_at: string;
    created_at_timestamp: number;
    plan: string;
    quota_usage: object;
    quota_allowed: object;
  }

  export interface TeamUser {
    user_id: number;
    email: string;
    fullname: string;
    created_at: string;
    created_at_timestamp: number;
    role: string;
  }

  export interface Translation {
    translation_id: number;
    key_id: number;
    language_iso: string;
    modified_at: string;
    modified_at_timestamp: number;
    modified_by: number;
    modified_by_email: string;
    translation: string;
    is_fuzzy: boolean;
    is_reviewed: boolean;
    reviewed_by: number;
    words: number;
    custom_translation_statuses: object[];
  }

  export interface TranslationProvider {
    provider_id: number;
    name: string;
    slug: string;
    price_pair_min: number;
    website_url: string;
    description: string;
    tiers: object;
    pairs: object;
  }

  export interface TranslationStatus {
    status_id: number;
    title: string;
    color: string;
  }

  export interface UploadFileParams {
    data: string;
    filename: string;
    queue?: boolean;
    lang_iso: string;
    convert_placeholder?: boolean;
    detect_icu_plurals?: boolean;
    tags?: any[];
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
    custom_translation_status_ids?: string | number[];
    custom_translation_status_inserted_keys?: boolean;
    custom_translation_status_updated_keys?: boolean;
    custom_translation_status_skipped_keys?: boolean;
    skip_detect_lang_iso?: boolean;
  }

  export interface UserGroup {
    group_id: number;
    name: string;
    permissions: Keyable;
    created_at: string;
    created_at_timestamp: number;
    team_id: number;
    projects: object[];
    members: number[];
  }

  export interface Webhook {
    webhook_id: string;
    url: string;
    secret: string;
    events: string[];
    event_lang_map: object;
  }

  export interface PaginatedResult {
    totalResults: number;
    totalPages: number;
    resultsPerPage: number;
    currentPage: number;
    items: any[];
    hasNextPage(): boolean;
    hasPrevPage(): boolean;
    isLastPage(): boolean;
    isFirstPage(): boolean;
    nextPage(): number;
    prevPage(): number;
  }

  export class ApiRequest {
    private urlRoot: NonNullable<Options["prefixUrl"]>;
    promise: Promise<any>;
    params: StandartParams;
    constructor(
      uri: string,
      method: Options["method"],
      body?: object | object[] | null,
      params?: StandartParams
    );
    createPromise(
      uri: string,
      method: Options["method"],
      body: object | object[] | null
    ): Promise<{}>;
    protected composeURI(uri: string): string;
    protected mapUriParams(
      params: StandartParams
    ): (entity: any, isMandaratory: any, paramName: string) => string;
  }

  export class BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string | null;
    protected static endpoint: string | null;
    protected static prefixURI: string | null;
    protected static elementClass: any;
    protected static secondaryElementNameSingular: string | null;
    protected static secondaryElementClass: any;
    get(id: string | number, params?: StandartParams, body?: any): Promise<any>;
    list(params?: StandartParams): Promise<PaginatedResult>;
    create(
      body: object | object[] | null,
      params?: StandartParams
    ): Promise<any>;
    update(
      id: string | number,
      body: object | object[] | null,
      params?: StandartParams
    ): Promise<any>;
    delete(id: string | number, params?: StandartParams): Promise<Keyable>;
    protected populateObjectFromJsonRoot(json: object, headers: object): any;
    protected populateSecondaryObjectFromJsonRoot(
      json: object,
      headers: object
    ): any;
    protected populateObjectFromJson(
      json: object,
      _headers: object,
      secondary: boolean
    ): any;
    protected populateArrayFromJson(
      json: Keyable,
      headers: object
    ): PaginatedResult | Keyable | this[];
    protected populateApiErrorFromJson(json: any): ApiError;
    protected returnBareJSON(
      json: Keyable | Array<Keyable>
    ): Keyable | Array<Keyable>;
    protected handleReject(data: any): ApiError;
    protected createPromise(
      method: Options["method"],
      params: StandartParams,
      resolveFn: Function,
      rejectFn: Function,
      body: object | object[] | null,
      uri: string | null
    ): Promise<any>;
  }

  export class Branches extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(body: object, params: StandartParams): Promise<Branch>;
    update(
      id: string | number,
      body: object,
      params: StandartParams
    ): Promise<Branch>;
    merge(
      id: string | number,
      params: StandartParams,
      body?: object
    ): Promise<Keyable>;
  }

  export class Comments extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(
      raw_body: object | object[],
      params: StandartParams
    ): Promise<Comment[]>;
    list_project_comments(params: StandartParams): Promise<PaginatedResult>;
  }

  export class Contributors extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(
      raw_body: object | object[],
      params: StandartParams
    ): Promise<Contributor[]>;
    update(
      id: string | number,
      body: object,
      params: StandartParams
    ): Promise<Contributor>;
  }

  export class Files extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    protected static secondaryElementNameSingular: string;
    protected static secondaryElementClass: object;
    upload(
      project_id: string,
      upload: UploadFileParams
    ): Promise<QueuedProcess>;
    download(
      project_id: string,
      download: DownloadFileParams
    ): Promise<Keyable>;
  }

  export class Keys extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(
      raw_body: object | object[],
      params: StandartParams
    ): Promise<Keyable>;
    update(
      id: string | number,
      body: object,
      params: StandartParams
    ): Promise<Key>;
    bulk_update(
      raw_keys: object | object[],
      params: StandartParams
    ): Promise<Keyable>;
    bulk_delete(
      raw_keys: number[] | string[],
      params: StandartParams
    ): Promise<Keyable>;
  }

  export class Languages extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    system_languages(params: StandartParams): Promise<PaginatedResult>;
    create(
      raw_body: object | object[],
      params: StandartParams
    ): Promise<Keyable>;
    update(
      id: string | number,
      body: object,
      params: StandartParams
    ): Promise<Language>;
  }

  export class Orders extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: object;
  }

  export class PaymentCards extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
  }

  export class Projects extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    empty(project_id: any): Promise<Keyable>;
  }

  export class QueuedProcesses extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
  }

  export class Screenshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(
      raw_body: object | object[],
      params: StandartParams
    ): Promise<Keyable>;
    update(
      id: string | number,
      body: object,
      params: StandartParams
    ): Promise<Screenshot>;
  }

  export class Snapshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    restore(id: string | number, params: StandartParams): Promise<Keyable>;
    create(body: object, params: StandartParams): Promise<Snapshot>;
  }

  export class Tasks extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(body: object, params: StandartParams): Promise<Task>;
    update(id: any, body: any, params: StandartParams): Promise<any>;
  }

  export class TeamUsers extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    update(
      id: string | number,
      body: object,
      params: StandartParams
    ): Promise<TeamUser>;
  }

  export class Teams extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: object;
  }

  export class TranslationProviders extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: object;
  }

  export class Translations extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    update(
      id: string | number,
      body: object,
      params: StandartParams
    ): Promise<Translation>;
  }

  export class TranslationStatuses extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    protected static rootElementNameSingular: string;
    create(body: object, params: StandartParams): Promise<TranslationStatus>;
    update(
      id: string | number,
      body: object,
      params: StandartParams
    ): Promise<TranslationStatus>;
    available_colors(params: StandartParams): Promise<Keyable>;
  }

  export class UserGroups extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(body: object, params: StandartParams): Promise<UserGroup>;
    update(
      id: string | number,
      body: object,
      params: StandartParams
    ): Promise<UserGroup>;
    add_members_to_group(
      team_id: string | number,
      group_id: string | number,
      raw_body: string[] | number[]
    ): Promise<UserGroup>;
    remove_members_from_group(
      team_id: string | number,
      group_id: string | number,
      raw_body: string[] | number[]
    ): Promise<UserGroup>;
    add_projects_to_group(
      team_id: string | number,
      group_id: string | number,
      raw_body: string[] | number[]
    ): Promise<UserGroup>;
    remove_projects_from_group(
      team_id: string | number,
      group_id: string | number,
      raw_body: string[] | number[]
    ): Promise<UserGroup>;
    protected populateGroupFromJsonRoot(json: Keyable, headers: object): this;
  }

  export class Webhooks extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(body: object, params: StandartParams): Promise<Webhook>;
    update(
      id: string | number,
      body: object,
      params: StandartParams
    ): Promise<Webhook>;
    regenerate_secret(
      id: string | number,
      params: StandartParams
    ): Promise<Keyable>;
  }

  export class LocaliseApiMethods {
    branches: Branches;
    comments: Comments;
    contributors: Contributors;
    files: Files;
    keys: Keys;
    languages: Languages;
    orders: Orders;
    paymentCards: PaymentCards;
    projects: Projects;
    queuedProcesses: QueuedProcesses;
    screenshots: Screenshots;
    snapshots: Snapshots;
    tasks: Tasks;
    teams: Teams;
    teamUsers: TeamUsers;
    translationProviders: TranslationProviders;
    translations: Translations;
    translationStatuses: TranslationStatuses;
    userGroups: UserGroups;
    webhooks: Webhooks;
  }

  export class LokaliseApi extends LocaliseApiMethods {
    static apiKey: string | null;
    apiKey: string;
    /**
     * Instantiate LokaliseApi to have access to methods
     * @param params  object, mandatory
     * @returns       LokaliseApi object to work with.
     */
    constructor(params: Object);
  }
}
