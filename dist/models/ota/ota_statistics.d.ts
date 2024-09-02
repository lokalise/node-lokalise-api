import { OtaStatistics as OtaStatisticsInterface } from "../../interfaces/ota/ota_statistics.js";
import { BaseModel } from "./../base_model.js";
export declare class OtaStatistics
	extends BaseModel
	implements OtaStatisticsInterface
{
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
