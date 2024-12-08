import type { Keyable } from "../interfaces/keyable.js";
import { TeamUserBillingDetails as BillingDetailsModel } from "../models/team_user_billing_details.js";
import type { BillingDetailsParams } from "../types/billing_details.js";
import type { TeamOnly } from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";

export class TeamUserBillingDetails extends BaseCollection<BillingDetailsModel> {
	protected static prefixURI = "teams/{!:team_id}/billing_details";

	protected get elementClass(): new (
		json: Keyable,
	) => BillingDetailsModel {
		return BillingDetailsModel;
	}

	get(team_id: string | number): Promise<BillingDetailsModel> {
		const params = { team_id: team_id };
		return this.createPromise("GET", params, this.populateObjectFromJson, null);
	}

	create(
		billing_details_params: BillingDetailsParams,
		request_params: TeamOnly,
	): Promise<BillingDetailsModel> {
		return this.doCreate(billing_details_params, request_params);
	}

	update(
		team_id: string | number,
		billing_details_params: BillingDetailsParams,
	): Promise<BillingDetailsModel> {
		const params = { team_id: team_id };
		return this.createPromise(
			"PUT",
			params,
			this.populateObjectFromJson,
			billing_details_params,
		);
	}
}
