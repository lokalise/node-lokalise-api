import type { Keyable } from "../interfaces/keyable.js";
import { Segment } from "../models/segment.js";
import type {
	GetSegmentParams,
	ListSegmentParams,
	UpdateSegmentBodyParams,
	UpdateSegmentReqParams,
} from "../types/segments.js";
import { BaseCollection } from "./base_collection.js";

export class Segments extends BaseCollection<Segment> {
	protected static override prefixURI =
		"projects/{!:project_id}/keys/{!:key_id}/segments/{!:language_iso}/{:id}";

	protected get elementClass(): new (
		json: Keyable,
	) => Segment {
		return Segment;
	}

	protected override get rootElementName(): string {
		return "segments";
	}

	protected override get rootElementNameSingular(): string | null {
		return "segment";
	}

	list(request_params: ListSegmentParams): Promise<Segment[]> {
		return this.doList(request_params) as Promise<Segment[]>;
	}

	get(
		segment_number: string | number,
		request_params: GetSegmentParams,
	): Promise<Segment> {
		return this.doGet(segment_number, request_params);
	}

	update(
		segment_number: string | number,
		segment_params: UpdateSegmentBodyParams,
		request_params: UpdateSegmentReqParams,
	): Promise<Segment> {
		return this.doUpdate(segment_number, segment_params, request_params);
	}
}
