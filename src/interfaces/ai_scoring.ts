export interface AiScoringIssue {
	category: string;
	severity: string;
	comment: string;
	penalty: number;
}

export interface AiScoring {
	score: number;
	last_updated: string;
	last_updated_timestamp: number;
	issues: AiScoringIssue[];
}
