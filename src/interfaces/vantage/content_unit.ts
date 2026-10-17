import type { ContentUnitTypeVantage } from "../../types/vantage/content_unit_type.js";

export interface ContentUnitVantage {
	readonly id: string;
	readonly projectId: string;
	readonly type: ContentUnitTypeVantage;
	readonly key: string;
	readonly position: number;
	readonly sourceSegmentsCount: number;
}
