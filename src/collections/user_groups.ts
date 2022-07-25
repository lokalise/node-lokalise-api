import { BaseCollection } from "./base_collection.js";
import { UserGroup } from "../models/user_group.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class UserGroups extends BaseCollection {
  protected static rootElementName = "user_groups";
  protected static prefixURI = "teams/{!:team_id}/groups/{:id}";
  protected static elementClass = UserGroup;

  create(body: Keyable, params: StandartParams): Promise<UserGroup> {
    return this.createPromise(
      "POST",
      params,
      this.populateGroupFromJsonRoot,
      this.handleReject,
      body
    );
  }

  update(
    id: string | number,
    body: Keyable,
    params: StandartParams
  ): Promise<UserGroup> {
    params["id"] = id;
    return this.createPromise(
      "PUT",
      params,
      this.populateGroupFromJsonRoot,
      this.handleReject,
      body
    );
  }

  add_members_to_group(
    team_id: string | number,
    group_id: string | number,
    raw_body: string[] | number[]
  ): Promise<UserGroup> {
    const params: Keyable = {
      team_id: team_id,
      group_id: group_id,
    };
    const body = { users: raw_body };
    return this.createPromise(
      "PUT",
      params,
      this.populateGroupFromJsonRoot,
      this.handleReject,
      body,
      "teams/{!:team_id}/groups/{!:group_id}/members/add"
    );
  }

  remove_members_from_group(
    team_id: string | number,
    group_id: string | number,
    raw_body: string[] | number[]
  ): Promise<UserGroup> {
    const params: Keyable = {
      team_id: team_id,
      group_id: group_id,
    };
    const body = { users: raw_body };
    return this.createPromise(
      "PUT",
      params,
      this.populateGroupFromJsonRoot,
      this.handleReject,
      body,
      "teams/{!:team_id}/groups/{!:group_id}/members/remove"
    );
  }

  add_projects_to_group(
    team_id: string | number,
    group_id: string | number,
    raw_body: string[] | number[]
  ): Promise<UserGroup> {
    const params: Keyable = {
      team_id: team_id,
      group_id: group_id,
    };
    const body = { projects: raw_body };
    return this.createPromise(
      "PUT",
      params,
      this.populateGroupFromJsonRoot,
      this.handleReject,
      body,
      "teams/{!:team_id}/groups/{!:group_id}/projects/add"
    );
  }

  remove_projects_from_group(
    team_id: string | number,
    group_id: string | number,
    raw_body: string[] | number[]
  ): Promise<UserGroup> {
    const params: Keyable = {
      team_id: team_id,
      group_id: group_id,
    };
    const body = { projects: raw_body };
    return this.createPromise(
      "PUT",
      params,
      this.populateGroupFromJsonRoot,
      this.handleReject,
      body,
      "teams/{!:team_id}/groups/{!:group_id}/projects/remove"
    );
  }

  protected populateGroupFromJsonRoot(json: Keyable, headers: Keyable): this {
    const formatted_json = json["group"];
    return <this>this.populateObjectFromJson(formatted_json, headers);
  }
}
