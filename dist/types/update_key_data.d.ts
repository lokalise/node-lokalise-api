import { CreateKeyData } from "./create_key_data";
import { Filenames as Keynames } from "../types/filenames";
import { SupportedPlatforms } from "../types/supported_platforms";
export type UpdateKeyData = Omit<CreateKeyData, "key_name" | "platforms"> & {
    key_name?: string | Keynames;
    merge_tags?: boolean;
    platforms?: SupportedPlatforms[];
};
