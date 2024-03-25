import { OtaStatistics as OtaStatisticsInterface } from "../../interfaces/ota/ota_statistics.js";
import { BaseModel } from "./../base_model.js";

export class OtaStatistics extends BaseModel implements OtaStatisticsInterface {
  declare lokaliseProjectId: string;
  declare from: string;
  declare to: string;
  declare sdk: string;
  declare daily: Array<{
    date: string;
    downloads: number;
    trafficMb: number;
    trafficBytes: string;
    framework: string;
  }>;
  declare monthly: Array<{
    date: string;
    downloads: number;
    trafficMb: number;
    trafficBytes: string;
    framework: string;
  }>;
  declare totals: {
    downloads: number;
    trafficMb: number;
    trafficBytes: string;
  };
}
