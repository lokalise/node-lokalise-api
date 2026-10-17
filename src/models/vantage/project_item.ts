import type { ProjectItemVantage as IProjectItemVantage } from "../../interfaces/vantage/project_item.js";

export class ProjectItemVantage implements IProjectItemVantage {
	readonly id!: string;
	readonly projectId!: string;
	readonly name!: string;
	readonly createdAt!: string;
	readonly updatedAt!: string;

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
