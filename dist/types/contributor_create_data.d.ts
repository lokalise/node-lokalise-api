import { ContributorRights } from "./contributor_rights.js";
import { ContributorLanguages } from "./contributor_languages.js";
export type ContributorCreateData = {
    email: string;
    fullname?: string;
    is_admin?: boolean;
    is_reviewer?: boolean;
    languages: ContributorLanguages[];
    admin_rights?: ContributorRights[];
};
