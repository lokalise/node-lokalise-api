import type { OtaApiError } from "../../src/models/ota/ota_api_error.js";
import { LokaliseApiOta, Stub, describe, expect, it } from "../setup.js";

describe("OtaSdkTokens", () => {
	const token = process.env.API_JWT;
	const lokaliseApiOta = new LokaliseApiOta({ apiKey: process.env.API_JWT });
	const rootUrl = lokaliseApiOta.clientData.host;
	const teamId = 176692;
	const projectId = "88628569645b945648b474.25982965";
	const tokenId = 9709;

	it("handles errors", async () => {
		const stub = new Stub({
			fixture: "ota_sdk_tokens/error_404.json",
			uri: `teams/${teamId}/projects/fake/tokens`,
			version: "v3",
			skipApiToken: true,
			rootUrl,
			status: 404,
			reqHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});

		await stub.setStub();

		await lokaliseApiOta
			.otaSdkTokens()
			.list({
				teamId: teamId,
				lokaliseProjectId: "fake",
			})
			.catch((e: OtaApiError) => {
				expect(e.message).to.eq("Project not found");
				expect(e.statusCode).to.eq(404);
				expect(e.error).to.eq("ENTITY_NOT_FOUND");
			});
	});

	it("lists", async () => {
		const stub = new Stub({
			fixture: "ota_sdk_tokens/list.json",
			uri: `teams/${teamId}/projects/${projectId}/tokens`,
			version: "v3",
			skipApiToken: true,
			rootUrl,
			reqHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});

		await stub.setStub();

		const tokens = await lokaliseApiOta.otaSdkTokens().list({
			teamId: teamId,
			lokaliseProjectId: projectId,
		});

		expect(tokens[0].id).to.eq(9690);
		expect(tokens.length).to.eq(3);
	});

	it("creates", async () => {
		const stub = new Stub({
			fixture: "ota_sdk_tokens/create.json",
			uri: `teams/${teamId}/projects/${projectId}/tokens`,
			version: "v3",
			skipApiToken: true,
			rootUrl,
			method: "POST",
			reqHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});

		await stub.setStub();

		const createdToken = await lokaliseApiOta.otaSdkTokens().create({
			teamId: teamId,
			lokaliseProjectId: projectId,
		});

		expect(createdToken.id).to.eq(tokenId);
		expect(createdToken.token).to.eq("67aa2c0bd222669e192904edbb8081c3bf67");
		expect(createdToken.projectId).to.eq(188763);
		expect(createdToken.lokaliseId).to.eq(null);
		expect(createdToken.createdAt).to.eq("2023-09-23T11:57:09.486Z");
	});

	it("deletes", async () => {
		const stub = new Stub({
			fixture: "ota_sdk_tokens/delete.json",
			uri: `teams/${teamId}/projects/${projectId}/tokens/${tokenId}`,
			version: "v3",
			skipApiToken: true,
			rootUrl,
			method: "DELETE",
			reqHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});

		await stub.setStub();

		const response = await lokaliseApiOta.otaSdkTokens().delete(tokenId, {
			teamId: teamId,
			lokaliseProjectId: projectId,
		});

		expect(response.id).to.eq(tokenId);
		expect(response.deleted).to.be.true;
	});
});
