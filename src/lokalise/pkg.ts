import { readFile } from "node:fs/promises";
import type { Keyable } from "../interfaces/keyable.js";

function pkgPath(): string {
	return "../../package.json";
}

export async function getVersion(): Promise<string> {
	let pkg: Keyable | null;

	try {
		const data = await readFile(new URL(pkgPath(), import.meta.url));
		pkg = JSON.parse(data.toString());
	} catch {
		pkg = null;
	}

	return pkg ? pkg.version : "unknown";
}
