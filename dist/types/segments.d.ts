export type GetSegmentParams = {
	project_id: string;
	key_id: number | string;
	language_iso: string;
	disable_references?: number | string;
};
export type UpdateSegmentReqParams = Omit<
	GetSegmentParams,
	"disable_references"
>;
export type UpdateSegmentBodyParams = {
	value: string;
	is_fuzzy?: boolean;
	is_reviewed?: boolean;
	custom_translation_status_ids?: string[] | number[];
};
export type ListSegmentParams = GetSegmentParams & {
	filter_is_reviewed?: number | string;
	filter_unverified?: number | string;
	filter_untranslated?: number | string;
	filter_qa_issues?: string;
};
