import { warn } from "../../src/utils/logger.js";
import { describe, expect, it, vi } from "../setup.js";

describe("logger", () => {
	it("warns when silent is disabled", async () => {
		const message = "sample message";
		const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

		warn(false, message);

		expect(warnSpy).toHaveBeenCalledWith(message);

		warnSpy.mockRestore();
	});

	it("does not warn when silent is enabled", async () => {
		const message = "sample message";
		const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

		warn(true, message);

		expect(warnSpy).not.toHaveBeenCalledWith(message);

		warnSpy.mockRestore();
	});
});
