import type { ContentUnitVantage as IContentUnitVantage } from "../../interfaces/vantage/content_unit.js";
import type { ContentUnitTypeVantage } from "../../types/vantage/content_unit_type.js";

export class ContentUnitVantage implements IContentUnitVantage {
	readonly id!: string;
	readonly projectId!: string;
	readonly type!: ContentUnitTypeVantage;
	readonly key!: string;
	readonly position!: number;
	readonly sourceSegmentsCount!: number;

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
