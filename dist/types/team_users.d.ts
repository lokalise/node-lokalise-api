export type TeamUserParams = {
	role?: "owner" | "admin" | "member" | "biller";
};
export type TeamUserDeleted = {
	team_id: string;
	team_user_deleted: boolean;
};
