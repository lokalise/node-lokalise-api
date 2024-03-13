export type CreateScreenshotParams = {
    data: string;
    title?: string;
    description?: string;
    ocr?: boolean;
    key_ids?: string[] | number[];
    tags?: string[];
};
