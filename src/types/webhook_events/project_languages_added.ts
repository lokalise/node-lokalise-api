type AddedLanguage = {
  id: number;
  iso: string;
  name: string;
};

export type WebhookProjectLanguagesAdded = {
  event: "project.languages.added";
  languages: Array<AddedLanguage>;
  project: {
    id: string;
    name: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
