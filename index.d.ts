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
    languages: object;
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
    permissions: object;
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

  export class ApiRequest {
    private urlRoot: string;
    promise: Promise<any>;
    params: any;
    constructor(uri: any, method: any, body?: any, params?: {});
    createPromise(uri: any, method: any, body: any): Promise<{}>;
    protected composeURI(uri: any): any;
    protected mapUriParams(
      params: any
    ): (entity: any, isMandaratory: any, paramName: any) => any;
    constructParameters(_method: any, _params: any): void;
  }

  export class BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string | null;
    protected static endpoint: string | null;
    protected static prefixURI: string | null;
    protected static elementClass: any | null;
    protected static secondaryElementNameSingular: string | null;
    protected static secondaryElementClass: any;
    get(id: any, params?: StandartParams, body?: any): Promise<any>;
    list(params?: StandartParams): Promise<any[]>;
    create(body: any, params?: StandartParams): Promise<any>;
    update(id: any, body: any, params?: StandartParams): Promise<any>;
    delete(id: any, params?: StandartParams): Promise<any>;
    protected populateObjectFromJsonRoot(json: Object): this;
    protected populateSecondaryObjectFromJsonRoot(json: any): this;
    protected populateObjectFromJson(json: Object, secondary: boolean): this;
    protected populateArrayFromJson(json: Array<any>): this[];
    protected returnBareJSON(json: any): any;
    protected handleReject(data: any): void;
    protected createPromise(
      method: any,
      params: any,
      resolveFn: any,
      rejectFn?: (data: any) => void,
      body?: any,
      uri?: any
    ): Promise<any>;
  }

  export class Branches extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(body: any, params: StandartParams): Promise<any>;
    update(id: any, body: any, params: StandartParams): Promise<any>;
    merge(id: any, params: StandartParams, body: any): Promise<any>;
  }

  export class Comments extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(body: any, params?: StandartParams): Promise<any>;
    list_project_comments(params?: StandartParams): Promise<any[]>;
  }

  export class Contributors extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(raw_body: any, params?: StandartParams): Promise<any>;
  }

  export class Files extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    protected static secondaryElementNameSingular: string;
    protected static secondaryElementClass: Object;
    list(params?: FileParams): Promise<this[]>;
    upload(project_id: string, upload: UploadFileParams): Promise<any>;
    download(project_id: string, download: DownloadFileParams): Promise<any>;
  }

  export class Keys extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(body: any, params?: StandartParams): Promise<any>;
    update(id: any, body: any, params?: StandartParams): Promise<any>;
    bulk_update(raw_keys: object[], params: StandartParams): Promise<any>;
    bulk_delete(raw_keys: number[] | string[], params: StandartParams): any;
  }

  export class Languages extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    system_languages(params: StandartParams): Promise<any>;
    create(raw_body: any, params?: StandartParams): Promise<any>;
    update(id: any, body: any, params: StandartParams): Promise<any>;
  }

  export class Orders extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
  }

  export class PaymentCards extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
  }

  export class Projects extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    empty(project_id: any): void;
  }

  export class QueuedProcesses extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
  }

  export class Screenshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(raw_body: any, params: StandartParams): Promise<any>;
    update(id: any, body: any, params: StandartParams): Promise<any>;
  }

  export class Snapshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    restore(id: any, params: StandartParams): Promise<any>;
    create(body: any, params: StandartParams): Promise<any>;
  }

  export class Tasks extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;

    create(body: any, params: StandartParams): Promise<any>;
    update(id: any, body: any, params: StandartParams): Promise<any>;
  }

  export class TeamUsers extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    update(id: any, body: any, params: StandartParams): Promise<any>;
  }

  export class Teams extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
  }

  export class TranslationProviders extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
  }

  export class Translations extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    update(id: any, body: any, params: StandartParams): Promise<any>;
  }

  export class TranslationStatuses extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    protected static rootElementNameSingular: string;

    create(body: any, params: StandartParams): Promise<any>;
    update(id: any, body: any, params: StandartParams): Promise<any>;
    available_colors(params: StandartParams): Promise<any>;
  }

  export class UserGroups extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(body: any, params?: StandartParams): Promise<any>;
    update(id: any, body: any, params: StandartParams): Promise<any>;
    add_projects_to_group(
      team_id: any,
      group_id: any,
      raw_body: any[],
      params: any
    ): Promise<any>;
    remove_projects_from_group(
      team_id: any,
      group_id: any,
      raw_body: any[],
      params: any
    ): Promise<any>;
    add_members_to_group(
      team_id: any,
      group_id: any,
      raw_body: any[],
      params: any
    ): Promise<any>;
    remove_members_from_group(
      team_id: any,
      group_id: any,
      raw_body: any[],
      params: any
    ): Promise<any>;
  }

  export class Webhooks extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;

    create(body: any, params: StandartParams): Promise<any>;
    update(id: any, body: any, params: StandartParams): Promise<any>;
    regenerate_secret(id: any, params: StandartParams): Promise<any>;
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
     * @param params  object, mandaratory
     * @returns       LokaliseApi object to work with.
     */
    constructor(params?: any);
  }
}
