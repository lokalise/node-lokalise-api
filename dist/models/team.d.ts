import { BaseModel } from "./base_model.js";
import { Team as TeamInterface } from "../interfaces/team.js";
export declare class Team extends BaseModel implements TeamInterface {
    team_id: number;
    name: string;
    created_at: string;
    created_at_timestamp: number;
    plan: string;
    quota_usage: {
        users: number;
        keys: number;
        projects: number;
        mau: number;
    };
    quota_allowed: {
        users: number;
        keys: number;
        projects: number;
        mau: number;
    };
}
