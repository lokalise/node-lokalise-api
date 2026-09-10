import type { ProjectItemVantage as IProjectItemVantage } from "../../interfaces/vantage/project_item.js";

export class ProjectItemVantage implements IProjectItemVantage {
	readonly id!: string;
	readonly projectId!: string;
	readonly type!: IProjectItemVantage["type"];
	readonly status!: IProjectItemVantage["status"];
	readonly name!: string;
	readonly userFacingTitle!: string;
	readonly previousItemId!: string | null;
	readonly importProcessId!: string;
	readonly createdAt!: string;
	readonly updatedAt!: string;
	readonly metadata!: IProjectItemVantage["metadata"];
	readonly file!: IProjectItemVantage["file"];

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
