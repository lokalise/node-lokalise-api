export interface GlossaryTerm {
	id: number;
	term: string;
	description: string;
	caseSensitive: boolean;
	translatable: boolean;
	forbidden: boolean;
	translations: Array<{
		langId: number;
		langName: string;
		langIso: string;
		translation: string;
		description: string;
	}>;
	tags: string[];
	createdAt: string;
	updatedAt: string | null;
}
