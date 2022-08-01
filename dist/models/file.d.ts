import { BaseModel } from "./base_model";
import { File as FileInterface } from "../interfaces/file";
export declare class File extends BaseModel implements FileInterface {
    file_id: number;
    filename: string;
    key_count: number;
}
