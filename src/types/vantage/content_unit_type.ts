import type { CursorPaginationParams } from "./cursor_pagination_params.js";

export type ContentUnitParams = CursorPaginationParams & {
	project_id: string;
	item_id: string;
	"filter-keys"?: string[];
};

export type ContentUnitTypeVantage =
	| "HTML_FILE"
	| "DOCX_FILE"
	| "PPTX_FILE"
	| "XLSX_FILE"
	| "MARKDOWN_FILE"
	| "IDML_FILE"
	| "JSON_FILE"
	| "YAML_FILE"
	| "XCSTRINGS_FILE"
	| "PO_FILE"
	| "XLIFF_FILE"
	| "PDF_FILE"
	| "TEXT"
	| "HTML"
	| "JSON"
	| "CONTENTFUL_RICH_TEXT";
