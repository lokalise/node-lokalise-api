export function getRequiredEnv(name: string): string {
	const value = process.env[name];

	if (!value?.trim()) {
		throw new Error(`Required environment variable ${name} is missing`);
	}

	return value;
}

export function getTestApiKey(): string {
	return getRequiredEnv("API_KEY");
}
