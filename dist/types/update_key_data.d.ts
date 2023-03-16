import { CreateKeyData } from "./create_key_data.js";
import { Filenames as Keynames } from "../types/filenames.js";
import { SupportedPlatforms } from "../types/supported_platforms.js";
export type UpdateKeyData = Omit<CreateKeyData, "key_name" | "platforms"> & {
    key_name?: string | Keynames;
    merge_tags?: boolean;
    platforms?: SupportedPlatforms[];
};
