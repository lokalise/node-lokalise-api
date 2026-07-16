import { AuditEventV1 } from "../../../src/models/v1/audit_event.js";
import type { AuditLogParams } from "../../../src/types/v1/audit_logs.js";
import { describe, expect, it, LokaliseApi, Stub } from "../../setup.js";

describe("Audit logs", () => {
	const lokaliseApi = new LokaliseApi({
		apiKey: process.env.API_KEY,
		version: "v1",
	});

	it("lists audit logs and returns cursor pagination metadata", async () => {
		const params: AuditLogParams = {
			limit: 2,
		};

		const stub = new Stub({
			fixture: "audit_logs/list.json",
			uri: "audit-logs",
			version: "v1",
			query: params,
		});

		await stub.setStub();

		const auditLogs = await lokaliseApi.auditLogs().list(params);

		expect(auditLogs.items).to.have.lengthOf(1);
		expect(auditLogs.items[0]).to.be.instanceOf(AuditEventV1);

		expect(auditLogs.items[0].metadata.uid).to.eq("event-1");
		expect(auditLogs.items[0].metadata.event_code).to.eq("project.deleted");
		expect(auditLogs.items[0].time).to.eq(1753267304);

		expect(auditLogs.next_cursor).to.eq("cursor-page-2");
		expect(auditLogs.has_more).to.be.true;
	});

	it("lists audit logs using a cursor from the previous response", async () => {
		const params: AuditLogParams = {
			limit: 2,
			cursor: "cursor-page-2",
			event_type: "fake",
		};

		const stub = new Stub({
			fixture: "audit_logs/list_next_cursor.json",
			uri: "audit-logs",
			version: "v1",
			query: params,
		});

		await stub.setStub();

		const auditLogs = await lokaliseApi.auditLogs().list(params);

		expect(auditLogs.items).to.have.lengthOf(1);
		expect(auditLogs.items[0].metadata.uid).to.eq("event-2");
		expect(auditLogs.items[0].metadata.event_code).to.eq("project.created");

		expect(auditLogs.next_cursor).to.be.null;
		expect(auditLogs.has_more).to.be.false;
	});

	it("raises an error when the audit logs response data is malformed", async () => {
		const params: AuditLogParams = {
			limit: 2,
		};

		const stub = new Stub({
			fixture: "audit_logs/list_malformed_data.json",
			uri: "audit-logs",
			version: "v1",
			query: params,
		});

		await stub.setStub();

		let error: Error | null = null;

		try {
			await lokaliseApi.auditLogs().list(params);
		} catch (e) {
			error = e as Error;
		}

		expect(error).not.to.be.null;
		expect(error?.message).to.eq(
			"Expected 'data' to be an array for cursor pagination but received: object",
		);
	});

	it("uses safe defaults when cursor pagination metadata is malformed", async () => {
		const params: AuditLogParams = {
			limit: 2,
		};

		const stub = new Stub({
			fixture: "audit_logs/list_malformed_pagination.json",
			uri: "audit-logs",
			version: "v1",
			query: params,
		});

		await stub.setStub();

		const auditLogs = await lokaliseApi.auditLogs().list(params);

		expect(auditLogs.items).to.have.lengthOf(1);
		expect(auditLogs.items[0].metadata.uid).to.eq("event-3");

		expect(auditLogs.next_cursor).to.be.null;
		expect(auditLogs.has_more).to.be.false;
	});
});
