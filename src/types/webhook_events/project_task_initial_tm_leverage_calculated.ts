type TmLeverage = {
  "600": {
    "0": 154;
    "50": 5;
    "75": 4;
    "85": 11;
    "95": 0;
    "100%": 6;
  };
};

export type WebhookProjectTaskInitialTmLeverageCalculated = {
  event: "project.task.initial_tm_leverage.calculated";
  task: {
    id: number;
    title: string;
    description: string;
    initial_tm_leverage: {
      [key: string]: TmLeverage;
    };
  };
  project: {
    id: string;
    name: string;
    branch: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
