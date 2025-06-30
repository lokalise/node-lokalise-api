import * as dotenv from "@dotenvx/dotenvx";

dotenv.config({ quiet: true });

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
