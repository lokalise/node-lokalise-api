import { BaseCollection } from './base_collection';
import { StandartParams } from '../interfaces/standart_params';
export declare class Keys extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(raw_body: any, params?: StandartParams): Promise<any>;
    update(id: any, body: any, params?: StandartParams): Promise<any>;
    bulk_update(raw_keys: object[], params: StandartParams): Promise<any>;
    bulk_delete(raw_keys: number[] | string[], params: StandartParams): any;
}
