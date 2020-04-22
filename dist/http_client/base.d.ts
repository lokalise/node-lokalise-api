export declare class ApiRequest {
    private urlRoot;
    promise: Promise<any>;
    params: any;
    constructor(uri: any, method: any, body?: any, params?: any);
    createPromise(uri: any, method: any, body: any): Promise<unknown>;
    protected composeURI(uri: any): any;
    protected mapUriParams(params: any): (_entity: any, isMandaratory: any, paramName: any) => any;
    constructParameters(_method: any, _params: any): void;
}
