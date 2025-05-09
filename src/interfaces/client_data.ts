export interface ClientData {
	token: string;
	tokenType: string;
	authHeader: string;
	enableCompression: boolean;
	silent: boolean;
	host?: string;
	version?: string;
	requestTimeout?: number;
}
