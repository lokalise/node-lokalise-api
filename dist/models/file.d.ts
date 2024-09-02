import type { File as FileInterface } from "../interfaces/file.js";
import { BaseModel } from "./base_model.js";
export declare class File extends BaseModel implements FileInterface {
    file_id: number;
    filename: string;
    key_count: number;
}
