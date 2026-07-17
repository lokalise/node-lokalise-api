import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { install } from "undici";

if (existsSync(".env")) {
	loadEnvFile();
}

install();

async function captureError(promise: Promise<unknown>): Promise<Error> {
	try {
		await promise;
	} catch (error) {
		if (error instanceof Error) {
			return error;
		}

		throw error;
	}

	throw new Error("Expected promise to reject");
}

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	LokaliseApi,
	LokaliseApiOAuth,
	LokaliseApiOta,
	LokaliseApiV1,
	LokaliseAuth,
	LokaliseOtaBundles,
} from "../src/main.js";
import { Stub } from "./stubs.js";

export {
	afterEach,
	beforeEach,
	captureError,
	describe,
	expect,
	it,
	LokaliseApi,
	LokaliseApiOAuth,
	LokaliseApiOta,
	LokaliseApiV1,
	LokaliseAuth,
	LokaliseOtaBundles,
	Stub,
	vi,
};
