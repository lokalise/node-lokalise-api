import type { BulkResult } from "../interfaces/bulk_result.js";
import type { CursorPaginatedResult } from "../interfaces/cursor_paginated_result.js";
import { GlossaryTerm } from "../models/glossary_term.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import type {
	CreateTermsParams,
	ListTermsParams,
	TermsDeleted,
	UpdateTermsParams,
} from "../types/glossary_terms.js";
import { BaseCollection } from "./base_collection.js";

export class GlossaryTerms extends BaseCollection<GlossaryTerm> {
	protected static override prefixURI =
		"projects/{!:project_id}/glossary-terms/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => GlossaryTerm {
		return GlossaryTerm;
	}

	protected override get rootElementName(): string {
		return "data";
	}

	protected override get rootElementNameSingular(): string | null {
		return "data";
	}

	get(
		term_id: string | number,
		request_params: ProjectOnly,
	): Promise<GlossaryTerm> {
		return this.doGet(term_id, request_params);
	}

	list(
		request_params: ListTermsParams,
	): Promise<CursorPaginatedResult<GlossaryTerm>> {
		return this.doListCursor(request_params);
	}

	create(
		term_params: CreateTermsParams,
		request_params: ProjectOnly,
	): Promise<BulkResult<GlossaryTerm>> {
		return this.createPromise(
			"POST",
			request_params,
			this.populateArrayFromJsonBulk,
			term_params,
		);
	}

	update(
		term_params: UpdateTermsParams,
		request_params: ProjectOnly,
	): Promise<BulkResult<GlossaryTerm>> {
		return this.createPromise(
			"PUT",
			request_params,
			this.populateArrayFromJsonBulk,
			term_params,
			"projects/{!:project_id}/glossary-terms",
		);
	}

	delete(
		term_ids: number[],
		request_params: ProjectOnly,
	): Promise<TermsDeleted> {
		const keys = { terms: term_ids };

		return this.createPromise<TermsDeleted>(
			"DELETE",
			request_params,
			this.populateFromBulkDelete,
			keys,
			"projects/{!:project_id}/glossary-terms",
		);
	}

	protected populateFromBulkDelete(
		json: Record<string, unknown>,
		_headers: Headers,
	): TermsDeleted {
		const dataRecord = json as Record<string, Record<string, unknown>>;
		const jsonData = dataRecord.data;

		return jsonData as TermsDeleted;
	}
}
