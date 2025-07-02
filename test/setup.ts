import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";

if (existsSync(".env")) {
	loadEnvFile();
}

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	LokaliseApi,
	LokaliseApiOAuth,
	LokaliseApiOta,
	LokaliseAuth,
	LokaliseOtaBundles,
} from "../src/main.js";
import { Stub } from "./stubs.js";

export {
	LokaliseApi,
	Stub,
	expect,
	it,
	describe,
	LokaliseAuth,
	LokaliseApiOAuth,
	LokaliseApiOta,
	LokaliseOtaBundles,
	vi,
	beforeEach,
	afterEach,
};
