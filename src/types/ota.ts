export type OtaResourceDeleted = {
  id: number;
  deleted: boolean;
};

export type OtaTeamProject = {
  teamId: number | string;
  lokaliseProjectId: string;
};

export type OtaFramework = {
  framework: "ios_sdk" | "android_sdk" | "flutter_sdk";
};

export type OtaTeamProjectFramework = OtaTeamProject & OtaFramework;

export type OtaProjectFramework = OtaFramework & {
  lokaliseProjectId: string;
};

export type OtaFreezePeriodParams = {
  from: string;
  to: string;
  bundleId: number | string;
};

export type OtaUsageParams = {
  dateFrom: string;
  dateTo: string;
  framework?: string;
};

export type OtaBundleUpdateData = {
  description: string;
};

export type OtaRequestBundleParams = {
  appVersion: string;
  transVersion: number;
  prerelease?: boolean;
};
