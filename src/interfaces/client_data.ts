export interface ClientData {
	token: string;
	tokenType: string;
	authHeader: string;
	enableCompression: boolean;
	host?: string;
	version?: string;
	requestTimeout?: number;
}
