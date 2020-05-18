import { StandartParams } from '../interfaces/standart_params';
import { ApiError } from '../models/api_error';
export declare class BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string | null;
    protected static endpoint: string | null;
    protected static prefixURI: string | null;
    protected static elementClass: any;
    protected static secondaryElementNameSingular: string | null;
    protected static secondaryElementClass: any;
    totalResults: number | null;
    totalPages: number | null;
    resultsPerPage: number | null;
    currentPage: number | null;
    get(id: any, params?: StandartParams, body?: any): Promise<any>;
    list(params?: StandartParams): Promise<any[]>;
    create(body: any, params?: StandartParams): Promise<any>;
    update(id: any, body: any, params?: StandartParams): Promise<any>;
    delete(id: any, params?: StandartParams): Promise<any>;
    populatePaginationDataFor(headers: any): void;
    protected populateObjectFromJsonRoot(json: any): this;
    protected populateSecondaryObjectFromJsonRoot(json: any): this;
    protected populateObjectFromJson(json: Object, secondary?: boolean): this;
    protected populateArrayFromJson(json: Array<any>): this[];
    protected populateApiErrorFromJson(json: Object): ApiError;
    protected returnBareJSON(json: any): any;
    protected handleReject(data: any): ApiError;
    protected createPromise(method: any, params: any, resolveFn: any, rejectFn?: (data: any) => ApiError, body?: any, uri?: any): Promise<any>;
}
