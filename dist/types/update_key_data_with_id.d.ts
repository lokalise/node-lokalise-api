import { UpdateKeyData } from "./update_key_data.js";
export type UpdateKeyDataWithId = UpdateKeyData & {
    key_id: string | number;
};
