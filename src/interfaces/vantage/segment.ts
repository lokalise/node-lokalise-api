import type {
	SegmentLastChangeSourceVantage,
	SegmentStatusVantage,
} from "../../types/vantage/segment.js";

export interface SegmentVantage {
	readonly id: string;
	readonly number: number;
	readonly value: string;
	readonly status: SegmentStatusVantage;
	readonly lastChangeSource: SegmentLastChangeSourceVantage;
	readonly contentLanguageId: string;
	readonly contentUnitId: string;
	readonly projectId: string;
	readonly metadata?: {
		readonly prefix?: string;
		readonly suffix?: string;
	} | null;
	readonly createdAt: string;
	readonly updatedAt?: string;
}
