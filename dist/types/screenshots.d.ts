export type CreateScreenshotParams = {
	data: string;
	title?: string;
	description?: string;
	ocr?: boolean;
	key_ids?: string[] | number[];
	tags?: string[];
};
export type UpdateScreenshotParams = Omit<
	CreateScreenshotParams,
	"data" | "ocr"
>;
export type ScreenshotDeleted = {
	project_id: string;
	screenshot_deleted: boolean;
	branch?: string;
};
export type ScreenshotData = {
	title?: string;
	description?: string;
	screenshot_tags?: string[];
	data?: string;
};
