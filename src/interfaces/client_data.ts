export interface ClientData {
	token: string;
	tokenType: string;
	authHeader: string;
	enableCompression: boolean;
	silent: boolean;
	host?: string | undefined;
	version?: string;
	requestTimeout?: number;
	userAgent?: string;
}
