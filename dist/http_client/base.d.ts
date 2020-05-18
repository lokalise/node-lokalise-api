export declare class ApiRequest {
    private urlRoot;
    promise: Promise<any>;
    params: any;
    constructor(uri: any, method: any, body?: any, params?: any);
    createPromise(uri: any, method: any, body: any): Promise<any>;
    protected composeURI(uri: any): string;
    protected mapUriParams(params: any): (_entity: any, isMandaratory: any, paramName: any) => any;
}
