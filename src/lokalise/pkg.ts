import { readFile } from "node:fs/promises";

/**
 * Attempts to read and parse the local package.json file to retrieve the version.
 * If the file cannot be read or parsed, returns "unknown".
 *
 * @returns {Promise<string>} The package version string or "unknown" if unavailable.
 */
export async function getVersion(): Promise<string> {
	try {
		const data = await readFile(new URL("../../package.json", import.meta.url));

		const pkg = JSON.parse(data.toString()) as { version?: unknown };

		return typeof pkg.version === "string" ? pkg.version : "unknown";
	} catch {
		return "unknown";
	}
}
