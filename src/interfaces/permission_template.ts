export interface PermissionTemplate {
	id: number;
	role: string;
	permissions: string[];
	description: string;
	tag: string;
	tagColor: string;
	tagInfo: string | null;
	doesEnableAllReadOnlyLanguages: boolean;
}
