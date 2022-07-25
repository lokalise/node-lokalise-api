import { BaseModel } from "./base_model.js";
import { File as FileInterface } from "../interfaces/file.js";
export declare class File extends BaseModel implements FileInterface {
    filename: string;
    key_count: number;
}
