import { readFile } from "node:fs/promises";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { getVersion } from "../../src/lokalise/pkg.js";

vi.mock("node:fs/promises", () => ({
	readFile: vi.fn(),
}));

const mockedReadFile = vi.mocked(readFile);

describe("getVersion", () => {
	beforeEach(() => {
		mockedReadFile.mockReset();
	});

	it("returns the package version", async () => {
		mockedReadFile.mockResolvedValue(
			Buffer.from(JSON.stringify({ version: "12.3.4" })),
		);

		await expect(getVersion()).resolves.toBe("12.3.4");
	});

	it("returns 'unknown' if version is missing", async () => {
		mockedReadFile.mockResolvedValue(Buffer.from(JSON.stringify({})));

		await expect(getVersion()).resolves.toBe("unknown");
	});

	it("returns 'unknown' if version is not a string", async () => {
		mockedReadFile.mockResolvedValue(
			Buffer.from(JSON.stringify({ version: 123 })),
		);

		await expect(getVersion()).resolves.toBe("unknown");
	});

	it("returns 'unknown' if the file cannot be read", async () => {
		mockedReadFile.mockRejectedValue(new Error("File not found"));

		await expect(getVersion()).resolves.toBe("unknown");
	});

	it("returns 'unknown' if package.json cannot be parsed", async () => {
		mockedReadFile.mockResolvedValue(Buffer.from("{ definitely not json"));

		await expect(getVersion()).resolves.toBe("unknown");
	});
});
