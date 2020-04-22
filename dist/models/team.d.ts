import { BaseModel } from './base_model';
import { Team as TeamInterface } from "../interfaces";
export declare class Team extends BaseModel implements TeamInterface {
    team_id: number;
    name: string;
    created_at: string;
    created_at_timestamp: number;
    plan: string;
    quota_usage: object;
    quota_allowed: object;
}
