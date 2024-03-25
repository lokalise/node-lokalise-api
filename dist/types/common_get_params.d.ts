export type TeamOnly = {
    team_id: string | number;
};
export type ProjectOnly = {
    project_id: string;
};
export type PaginationParams = {
    page?: number;
    limit?: number;
};
export type ProjectWithPagination = ProjectOnly & PaginationParams;
