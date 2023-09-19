import { HttpMethod } from "../types/http_method.js";
import { ApiRequest } from "../http_client/base.js";
import { ApiError } from "../models/api_error.js";
import { PaginatedResult } from "../models/paginated_result.js";
import { Keyable } from "../interfaces/keyable.js";
import { ClientData } from "../interfaces/client_data.js";
import { BulkResult } from "../interfaces/bulk_result.js";
type RejectHandler = (data: any) => ApiError;
type ResolveHandler = (json: Keyable, headers: Headers, ...args: any[]) => any;
export declare abstract class BaseCollection {
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
    protected doGet(id: string | number, req_params?: Keyable): Promise<any>;
    protected doDelete(id: string | number, req_params?: Keyable): Promise<any>;
    protected doCreate(body: Keyable | null, req_params?: Keyable, resolveFn?: (json: Keyable, _headers: Headers, secondary?: boolean) => any): Promise<any>;
    protected doUpdate(id: string | number, body: Keyable | null, req_params: Keyable, resolveFn?: (json: Keyable, headers: Headers) => any, method?: HttpMethod): Promise<any>;
    protected populateObjectFromJsonRoot(json: Keyable, headers: Headers): any;
    protected populateSecondaryObjectFromJsonRoot(json: Keyable, headers: Headers): any;
    protected populateObjectFromJson(json: Keyable, _headers: Headers, secondary?: boolean): any;
    protected populateArrayFromJsonBulk(json: Keyable, headers: Headers): BulkResult | this[];
    protected populateArrayFromJson(json: Keyable, headers: Headers): PaginatedResult | Keyable | this[];
    protected populateApiErrorFromJson(json: any): ApiError;
    protected returnBareJSON(json: Keyable | Array<Keyable>): Keyable | Array<Keyable>;
    protected handleReject(data: any): ApiError;
    protected createPromise(method: HttpMethod, params: Keyable, resolveFn: ResolveHandler | null, rejectFn: RejectHandler, body: object | object[] | null, uri?: string | null): Promise<any>;
    protected prepareRequest(method: HttpMethod, body: object | object[] | null, params: Keyable, uri?: string | null): ApiRequest;
    protected getUri(uri: string | null): string;
    protected objToArray(raw_body: Keyable | Keyable[]): Array<Keyable>;
}
export {};
