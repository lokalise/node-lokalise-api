import { BaseModel } from './base_model';
import { File as FileInterface } from "../interfaces";
export declare class File extends BaseModel implements FileInterface {
    filename: string;
    key_count: number;
}
