import { LokaliseApiMethods } from "./api_methods";
export declare class LokaliseApi extends LokaliseApiMethods {
    static apiKey: string | null;
    static enableCompression: boolean;
    static tokenHeader: string;
    /**
     * Instantiate LokaliseApi to have access to methods
     * @param params  object, mandatory
     * @returns       LokaliseApi object to work with.
     */
    constructor(params: Object);
}
