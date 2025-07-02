import type { Branch } from "../interfaces/branch.js";

export type BranchParams = {
	name?: string;
};

export type MergeBranchParams = {
	force_conflict_resolve_using?: "target" | "source";
	target_branch_id?: number | string;
};

export type BranchDeleted = {
	project_id: string;
	branch_deleted: boolean;
};

export type BranchMerged = {
	project_id: string;
	branch_merged: boolean;
	branch: Branch;
	target_branch: Branch;
};
