import { Options } from "got";
import { ApiError } from "../models/api_error";
import { PaginatedResult } from "../models/paginated_result";
import { Keyable } from "../interfaces/keyable";
import { ClientData } from "../interfaces/client_data";
import { BulkResult } from "../interfaces/bulk_result";
declare type RejectHandler = (data: any) => ApiError;
declare type ResolveHandler = (json: Keyable, headers: Keyable, ...args: any[]) => any;
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
    protected doList(params: Keyable): Promise<any>;
    protected doGet(id: string | number, params?: Keyable): Promise<any>;
    protected doDelete(id: string | number, params?: Keyable): Promise<any>;
    protected doCreate(body: Keyable | null, params?: Keyable, resolveFn?: (json: Keyable, _headers: Keyable, secondary?: boolean) => any): Promise<any>;
    protected doUpdate(id: string | number, body: Keyable | null, req_params: Keyable, resolveFn?: (json: Keyable, headers: Keyable) => any): Promise<any>;
    protected populateObjectFromJsonRoot(json: Keyable, headers: Keyable): any;
    protected populateSecondaryObjectFromJsonRoot(json: Keyable, headers: Keyable): any;
    protected populateObjectFromJson(json: Keyable, _headers: Keyable, secondary?: boolean): any;
    protected populateArrayFromJsonBulk(json: Keyable, headers: Keyable): BulkResult | this[];
    protected populateArrayFromJson(json: Keyable, headers: Keyable): PaginatedResult | Keyable | this[];
    protected populateApiErrorFromJson(json: any): ApiError;
    protected returnBareJSON(json: Keyable | Array<Keyable>): Keyable | Array<Keyable>;
    protected handleReject(data: any): ApiError;
    protected createPromise(method: Options["method"], params: Keyable, resolveFn: ResolveHandler, rejectFn: RejectHandler, body: object | object[] | null, uri?: string | null): Promise<any>;
    protected objToArray(raw_body: Keyable | Keyable[]): Array<Keyable>;
}
export {};
