export interface Screenshot {
    screenshot_id: number;
    key_ids: number[];
    keys: Array<{
        key_id: number;
        coordinates: {
            left: number;
            top: number;
            width: number;
            height: number;
        };
    }>;
    url: string;
    title: string;
    description: string;
    screenshot_tags: string[];
    width: number;
    height: number;
    created_at: string;
    created_at_timestamp: number;
}
