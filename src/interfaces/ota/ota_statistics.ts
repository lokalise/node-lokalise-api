export interface OtaStatistics {
	lokaliseProjectId: string;
	from: string;
	to: string;
	sdk: string;
	daily: Array<{
		date: string;
		downloads: number;
		trafficMb: number;
		trafficBytes: string;
		framework: string;
	}>;
	monthly: Array<{
		date: string;
		downloads: number;
		trafficMb: number;
		trafficBytes: string;
		framework: string;
	}>;
	totals: {
		downloads: number;
		trafficMb: number;
		trafficBytes: string;
	};
}
