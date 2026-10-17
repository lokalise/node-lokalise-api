import type { SegmentVantage } from "./segment.js";

export interface SegmentWarningVantage {
	readonly code: string;
	readonly details?: Record<string, unknown>;
}

export interface SegmentUpdateResultVantage {
	readonly data: SegmentVantage;
	readonly warnings?: SegmentWarningVantage[];
}
