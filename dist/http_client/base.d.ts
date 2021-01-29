export declare class ApiRequest {
    private urlRoot;
    promise: Promise<any>;
    params: any;
    constructor(uri: string, method: string, body?: Object | Array<Object> | null, params?: Object);
    createPromise(uri: string, method: any, body: Object | Array<Object> | null): Promise<any>;
    protected composeURI(uri: any): string;
    protected mapUriParams(params: any): (_entity: any, isMandaratory: any, paramName: any) => any;
}
