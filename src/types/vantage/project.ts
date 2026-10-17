import type { CursorPaginationParams } from "./cursor_pagination_params.js";

export type ProjectReviewThresholdVantage =
	| "FULL_REVIEW"
	| "CRITICAL_MAJOR_MINOR"
	| "CRITICAL_MAJOR"
	| "CRITICAL";

export type ProjectTranslationSettingsVantage =
	| {
			readonly reviewTurnaroundDays: number;
			readonly workflowType: "AI_HUMAN_REVIEW";
			readonly reviewThreshold: ProjectReviewThresholdVantage;
	  }
	| {
			readonly reviewTurnaroundDays: number;
			readonly workflowType: "AI_ONLY";
			readonly reviewThreshold: null;
	  };

export type ProjectParams = CursorPaginationParams & {
	team_id: string;
};
