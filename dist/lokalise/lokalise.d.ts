import { LocaliseApiMethods } from "./api_methods";
export declare class LokaliseApi extends LocaliseApiMethods {
    static apiKey: string | null;
    apiKey: string;
    /**
     * Instantiate LokaliseApi to have access to methods
     * @param params  object, mandaratory
     * @returns       LokaliseApi object to work with.
     */
    constructor(params: any);
}
