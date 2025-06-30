import { describe, expect, it, LokaliseApiOta, Stub } from "../setup.js";

describe("OtaBundlePublishing", () => {
	const token = process.env.API_JWT;
	const lokaliseApiOta = new LokaliseApiOta({ apiKey: token });
	const teamId = 176692;
	const projectId = "88628569645b945648b474.25982965";
	const bundleId = 682463;
	const framework = "ios_sdk";
	const rootUrl = lokaliseApiOta.clientData.host;

	it("publishes", async () => {
		const stub = new Stub({
			fixture: "",
			uri: `teams/${teamId}/projects/${projectId}/frameworks/${framework}/publish`,
			version: "v3",
			skipApiToken: true,
			rootUrl,
			method: "POST",
			status: 204,
			body: { bundleId },
			reqHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});

		await stub.setStub();

		const res = await lokaliseApiOta.otaBundlePublishing().publish(bundleId, {
			teamId: teamId,
			lokaliseProjectId: projectId,
			framework,
		});

		expect(res).to.be.null;
	});

	it("stages", async () => {
		const stub = new Stub({
			fixture: "",
			uri: `teams/${teamId}/projects/${projectId}/frameworks/${framework}/stage`,
			version: "v3",
			skipApiToken: true,
			rootUrl,
			method: "POST",
			status: 204,
			body: { bundleId },
			reqHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});

		await stub.setStub();

		const res = await lokaliseApiOta.otaBundlePublishing().stage(bundleId, {
			teamId: teamId,
			lokaliseProjectId: projectId,
			framework,
		});

		expect(res).to.be.null;
	});
});
