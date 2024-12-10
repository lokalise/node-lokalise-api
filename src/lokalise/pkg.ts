import { readFile } from "node:fs/promises";

/**
 * Returns the relative path to the package.json file.
 * Adjust this if your directory structure changes.
 */
function pkgPath(): string {
	return "../../package.json";
}

/**
 * Attempts to read and parse the local package.json file to retrieve the version.
 * If the file cannot be read or parsed, returns "unknown".
 *
 * @returns {Promise<string>} The package version string or "unknown" if unavailable.
 */
export async function getVersion(): Promise<string> {
	try {
		const data = await readFile(new URL(pkgPath(), import.meta.url));
		const pkg = JSON.parse(data.toString()) as { version?: string };
		return String(pkg.version);
	} catch {
		return "unknown";
	}
}
