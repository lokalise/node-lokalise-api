import { BaseCollection } from './base_collection';
import { StandartParams } from '../interfaces/standart_params';
export declare class Languages extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    system_languages(params: StandartParams): Promise<any>;
    create(raw_body: any, params?: StandartParams): Promise<any>;
    update(id: any, body: any, params?: StandartParams): Promise<any>;
}
