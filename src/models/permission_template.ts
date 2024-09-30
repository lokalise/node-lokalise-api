import type { PermissionTemplate as PermissionTemplateInterface } from "../interfaces/permission_template.js";
import { BaseModel } from "./base_model.js";

export class PermissionTemplate extends BaseModel implements PermissionTemplateInterface {
	declare id: number;
	declare role: string;
	declare permissions: string[];
	declare description: string;
	declare tag: string;
	declare tagColor: string;
	declare doesEnableAllReadOnlyLanguages: boolean;
}
