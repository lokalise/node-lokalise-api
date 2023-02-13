import { ProjectOnly } from "./project_only.js";
import type { NumericBool } from "../types/numeric_bool.js";
export interface GetKeyParams extends ProjectOnly {
    disable_references?: NumericBool;
}
