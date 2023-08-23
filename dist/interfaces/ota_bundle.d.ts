export interface OtaBundle {
    id: number;
    projectId: string;
    isPrerelease: boolean;
    isProduction: boolean;
    createdAt: string;
    createdBy: string;
    framework: string;
    description: string;
    isFrozen: boolean;
    lokaliseId: number;
    fileId: string;
    fileUrl: string;
    modifiedAt: string;
}
