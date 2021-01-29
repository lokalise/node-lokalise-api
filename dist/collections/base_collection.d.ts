import { StandartParams } from "../interfaces/standart_params";
import { ApiError } from "../models/api_error";
import { PaginatedResult } from "../models/paginated_result";
import { Keyable } from "../interfaces/keyable";
export declare class BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string | null;
    protected static endpoint: string | null;
    protected static prefixURI: string | null;
    protected static elementClass: any;
    protected static secondaryElementNameSingular: string | null;
    protected static secondaryElementClass: any;
    get(id: string | number, params?: StandartParams, _body?: any): Promise<any>;
    list(params?: StandartParams): Promise<PaginatedResult>;
    create(body: Object | Array<Object> | null, params?: StandartParams): Promise<any>;
    update(id: string | number, body: Object | Array<Object> | null, params?: StandartParams): Promise<any>;
    delete(id: string | number, params?: StandartParams): Promise<Keyable>;
    protected populateObjectFromJsonRoot(json: Object, headers: Object): Object;
    protected populateSecondaryObjectFromJsonRoot(json: Object, headers: Object): Object;
    protected populateObjectFromJson(json: Object, _headers: Object, secondary?: boolean): Object;
    protected populateArrayFromJson(json: Keyable, headers: Object): PaginatedResult | Keyable | this[];
    protected populateApiErrorFromJson(json: any): ApiError;
    protected returnBareJSON(json: Object | Array<Object>): Object | Array<Object>;
    protected handleReject(data: any): ApiError;
    protected createPromise(method: string, params: Object, resolveFn: Function, rejectFn?: Function, body?: Object | Array<Object> | null, uri?: string | null): Promise<any>;
    protected objToArray(raw_body: Object | Object[]): Array<Object>;
}
