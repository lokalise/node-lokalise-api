export interface BulkResult<T = any> {
    readonly items: T[];
    readonly errors: any[];
}
