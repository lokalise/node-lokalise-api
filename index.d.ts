declare module '@lokalise/node-api' {
  export interface UploadFileParams {
    data: string;
    filename: string;
    lang_iso: string;
    convert_placeholder?: string;
    detect_icu_plurals?: boolean;
    tags?: any[];
    replace_modified?: boolean;
    slashn_to_linebreak?: boolean;
    keys_to_values?: boolean;
    apply_tm?: boolean;
    hidden_from_contributors?: boolean;
    cleanup_mode?: boolean;
  }

  export interface StandartParams {
    page?: number;
    limit?: number;
    [paramName: string]: any;
  }

  export interface Project {
    project_id: number;
    name: string;
    description: string;
    team_id: number;
    created_by_email: string;
    created_at: string;
    created_by: number;
  }

  export interface Language {
    lang_id: number;
    lang_iso: string;
    lang_name: string;
    is_rtl: boolean;
    plural_forms: string[];
  }

  export interface Key {
    key_id: number;
    created_at: string;
    key_name: string;
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
  }

  export interface FileParams extends StandartParams {
    filter_filename?: string;
  }

  export interface DownloadFileParams {
    format: string;
    original_filenames?: boolean;
    bundle_structure?: string;
    directory_prefix?: string;
    all_platforms?: string;
    filter_langs?: any[];
    filter_data?: any[];
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
    plural_format?: string[];
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
  }

  export interface Comment {
    comment_id: number;
    key_id: number;
    comment: string;
    added_by: number;
    added_by_email: string;
    added_at: string;
  }

  export interface BulkUpdateKeysParams {
    keys: Key[];
  }

  export interface Headers {
    [paramName: string]: any;
  }

  export class ApiRequest {
    private urlRoot;
    promise: Promise<Object>;
    params: any;
    constructor(uri: any, method: any, body?: any, params?: {});
    createPromise(uri: any, method: any, body: any): Promise<{}>;
    protected composeURI(uri: any): any;
    protected mapUriParams(
      params: any,
    ): (entity: any, isMandaratory: any, paramName: any) => any;
    constructParameters(method: any, params: any): void;
  }

  export class UserGroups extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(body: any, params?: StandartParams): Promise<any>;
    add_project_to_group(
      team_id: any,
      group_id: any,
      body: any,
      params: any,
    ): Promise<any>;
    remove_project_from_group(
      team_id: any,
      group_id: any,
      body: any,
      params: any,
    ): Promise<any>;
  }

  export class Translations extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
  }
  export class Teams extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
  }

  export class TeamUsers extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
  }

  export class Tasks extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
  }
  export class Snapshots extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    restore(params: StandartParams): Promise<any>;
  }

  export class Screenshots extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
  }

  export class Projects extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    empty(project_id: any): void;
  }
  export class Languages extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    system_languages(params: StandartParams): Promise<any>;
    create(body: any, params?: StandartParams): Promise<any>;
  }

  export class Keys extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(body: any, params?: StandartParams): Promise<any>;
    bulk_update(
      keys: BulkUpdateKeysParams,
      params: StandartParams,
    ): Promise<any>;
    bulk_delete(keys: number[] | string[], params: StandartParams): any;
  }

  export class Files extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    list(params?: FileParams): Promise<this[]>;
    upload(project_id: string, upload: UploadFileParams): Promise<any>;
    download(project_id: string, download: DownloadFileParams): Promise<any>;
  }

  export class Contributors extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(body: any, params?: StandartParams): Promise<any>;
  }

  export class Comments extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(body: any, params?: StandartParams): Promise<any>;
    list_project_comments(params?: StandartParams): Promise<any[]>;
  }
  export class BaseCollection {
    protected static rootElementName: string;
    protected static endpoint: string;
    protected static prefixURI: string;
    protected static elementClass: any;
    get(id: any, params?: StandartParams, body?: any): Promise<any>;
    list(params?: StandartParams): Promise<any[]>;
    create(body: any, params?: StandartParams): Promise<any>;
    update(id: any, body: any, params?: StandartParams): Promise<any>;
    delete(id: any, params?: StandartParams): Promise<any>;
    protected populateObjectFromJson(json: Object): this;
    protected populateArrayFromJson(json: Array<any>): this[];
    protected returnBareJSON(json: any): any;
    protected handleReject(data: any): void;
    protected createPromise(
      method: any,
      params: any,
      resolveFn: any,
      rejectFn?: (data: any) => void,
      body?: any,
      uri?: any,
    ): Promise<any>;
  }

  export class LocaliseApiMethods {
    comments: Comments;
    contributors: Contributors;
    files: Files;
    keys: Keys;
    languages: Languages;
    projects: Projects;
    screenshots: Screenshots;
    snapshots: Snapshots;
    tasks: Tasks;
    teamUsers: TeamUsers;
    userGroups: UserGroups;
    translations: Translations;
  }

  export class LokaliseApi extends LocaliseApiMethods {
    static apiKey: string;
    private static _instance;
    apiKey: string;
    /**
     * Instantiate LokaliseApi to have access to methods
     * @param apiKey  text, mandaratory
     * @returns       LokaliseApi object to work with.
     */
    constructor(params?: Object);
  }
}
