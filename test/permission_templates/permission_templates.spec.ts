import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";

describe("Permission templates", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const teamId = 176692;

  it("lists", async () => {
		const stub = new Stub({
			fixture: "permission_templates/list.json",
			uri: `teams/${teamId}/roles`,
      respHeaders: {
				"x-pagination-total-count": "5",
				"x-pagination-page": "1",
				"x-pagination-limit": "500",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const roles = await lokaliseApi.permissionTemplates().list({
			team_id: teamId,
		});

		const roleDetails = roles.items[0];

		expect(roleDetails.id).to.eq(1);
    expect(roleDetails.role).to.eq("Manager");
    expect(roleDetails.permissions).to.include("tasks");
    expect(roleDetails.description).to.include("Manage project settings");
    expect(roleDetails.tag).to.eq("Full access");
    expect(roleDetails.tagColor).to.eq("green");
    expect(roleDetails.tagInfo).to.be.null;
    expect(roleDetails.doesEnableAllReadOnlyLanguages).to.be.true;
  });
});