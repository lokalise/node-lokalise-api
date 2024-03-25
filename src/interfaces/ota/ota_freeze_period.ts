export interface OtaFreezePeriod {
  id: number;
  projectId: number;
  bundleId: number;
  framework: string;
  from: string;
  to: string;
}
