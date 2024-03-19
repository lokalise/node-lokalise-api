type TmLeverage = {
  "0": number;
  "50": number;
  "75": number;
  "85": number;
  "95": number;
  "100%": number;
};

export type WebhookProjectTaskInitialTmLeverageCalculated = {
  event: "project.task.initial_tm_leverage.calculated";
  task: {
    id: number;
    title: string;
    description: string;
    initial_tm_leverage: {
      [key: string | number]: TmLeverage;
    };
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
