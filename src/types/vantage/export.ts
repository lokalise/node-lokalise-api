import type { ExportStatusVantage } from "../../interfaces/vantage/export.js";
import type { CursorPaginationParams } from "./cursor_pagination_params.js";

export type ExportLanguagesVantage =
	| {
			locales: string[];
			languageIds?: never;
	  }
	| {
			locales?: never;
			languageIds: string[];
	  }
	| {
			locales?: never;
			languageIds?: never;
	  };

export type ExportItemVantage = {
	itemId: string;
} & ExportLanguagesVantage;

export type ExportParams =
	| {
			locales: string[];
			languageIds?: never;
			items?: never;
	  }
	| {
			locales?: never;
			languageIds: string[];
			items?: never;
	  }
	| {
			locales?: never;
			languageIds?: never;
			items: ExportItemVantage[];
	  }
	| {
			locales?: never;
			languageIds?: never;
			items?: never;
	  };

export type ExportListParams = {
	project_id: string;
	"filter-status"?: ExportStatusVantage;
	"filter-ids"?: string[];
} & CursorPaginationParams;
