import { BaseCollection } from "./base_collection";
import { UserGroup } from "../models/user_group";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";

export class UserGroups extends BaseCollection {
  protected static rootElementName: string = "user_groups";
  protected static prefixURI: string = "teams/{!:team_id}/groups/{:id}";
  protected static elementClass: object = UserGroup;

  create(body: object, params: StandartParams): Promise<UserGroup> {
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
    body: object,
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
    const params: object = {
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
    const params: object = {
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
    const params: object = {
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
    const params: object = {
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

  protected populateGroupFromJsonRoot(json: Keyable, headers: object): this {
    const formatted_json = json["group"];
    return <this>this.populateObjectFromJson(formatted_json, headers);
  }
}
