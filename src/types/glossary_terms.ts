import type { CursorPagination, ProjectOnly } from "./common_get_params.js";

export type ListTermsParams = ProjectOnly &
	Omit<CursorPagination, "pagination">;

export type CreateTermsParams = {
	terms: Array<{
		term: string;
		description: string;
		caseSensitive: boolean;
		translatable: boolean;
		forbidden: boolean;
		translations?: Array<{
			langId?: number;
			translation?: string;
			description?: string;
		}>;
		tags?: string[];
	}>;
};

export type UpdateTermsParams = {
	terms: Array<{
		id: number;
		term?: string;
		description?: string;
		caseSensitive?: boolean;
		translatable?: boolean;
		forbidden?: boolean;
		translations?: Array<{
			langId?: number;
			translation?: string;
			description?: string;
		}>;
		tags?: string[];
	}>;
};

export type TermsDeleted = {
	deleted: {
		count: number;
		ids: number[];
	};
	failed: Array<{
		count: number;
		ids: number[];
		message: string;
	}>;
};
