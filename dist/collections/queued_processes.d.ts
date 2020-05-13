import { BaseCollection } from './base_collection';
import { StandartParams } from '../interfaces/standart_params';
export declare class QueuedProcesses extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    getDetailed(id: any, params?: StandartParams, type?: string): Promise<any>;
}
