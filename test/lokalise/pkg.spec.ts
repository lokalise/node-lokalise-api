import { describe, expect, it, vi } from "vitest";
import { getVersion } from "../../src/lokalise/pkg";

vi.mock("node:fs/promises", () => {
	return {
		readFile: vi.fn().mockRejectedValue(new Error("File not found")),
	};
});

describe("getVersion", () => {
	it("returns 'unknown' if the file does not exist", async () => {
		const version = await getVersion();
		expect(version).toBe("unknown");
	});
});
