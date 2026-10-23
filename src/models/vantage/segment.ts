import type { SegmentVantage as ISegmentVantage } from "../../interfaces/vantage/segment.js";
import type {
	SegmentLastChangeSourceVantage,
	SegmentStatusVantage,
} from "../../types/vantage/segment.js";

export class SegmentVantage implements ISegmentVantage {
	readonly id!: string;
	readonly number!: number;
	readonly value!: string;
	readonly status!: SegmentStatusVantage;
	readonly lastChangeSource!: SegmentLastChangeSourceVantage;
	readonly contentLanguageId!: string;
	readonly contentUnitId!: string;
	readonly projectId!: string;
	readonly metadata!: {
		readonly prefix: string;
		readonly suffix: string;
	} | null;
	readonly createdAt!: string;
	readonly updatedAt?: string;

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
