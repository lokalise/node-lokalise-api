import { ProjectOnly } from "./project_only";
export interface ProjectWithPagination extends ProjectOnly {
    page?: number;
    limit?: number;
}
