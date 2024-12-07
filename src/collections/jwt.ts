import type { Keyable } from "../interfaces/keyable.js";
import { Jwt as JwtModel } from "../models/jwt.js";
import { BaseCollection } from "./base_collection.js";

export class Jwt extends BaseCollection<JwtModel> {
	protected static prefixURI = "projects/{!:project_id}/tokens";

	protected get elementClass(): new (
		json: Keyable,
	) => JwtModel {
		return JwtModel;
	}

	create(project_id: string, body = { service: "ota" }): Promise<JwtModel> {
		const request_params = { project_id: project_id };
		return this.doCreate(body, request_params, this.populateObjectFromJson);
	}
}
