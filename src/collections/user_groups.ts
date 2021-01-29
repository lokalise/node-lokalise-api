import { BaseCollection } from "./base_collection";
import { UserGroup } from "../models/user_group";
import { StandartParams } from "../interfaces/standart_params";

export class UserGroups extends BaseCollection {
  protected static rootElementName: string = "user_groups";
  protected static prefixURI: string = "teams/{!:team_id}/groups/{:id}";
  protected static elementClass: Object = UserGroup;

  create(body: any, params: StandartParams): Promise<any> {
    return this.createPromise(
      "POST",
      params,
      this.populateGroupFromJsonRoot,
      this.handleReject,
      body
    );
  }

  update(id: any, body: any, params: StandartParams): Promise<any> {
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
    team_id: any,
    group_id: any,
    raw_body: any[],
    params: any = {}
  ): Promise<any> {
    params["team_id"] = team_id;
    params["group_id"] = group_id;
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
    team_id: any,
    group_id: any,
    raw_body: any[],
    params: any = {}
  ): Promise<any> {
    params["team_id"] = team_id;
    params["group_id"] = group_id;
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
    team_id: any,
    group_id: any,
    raw_body: any[],
    params: any = {}
  ): Promise<any> {
    params["team_id"] = team_id;
    params["group_id"] = group_id;
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
    team_id: any,
    group_id: any,
    raw_body: any[],
    params: any = {}
  ): Promise<any> {
    params["team_id"] = team_id;
    params["group_id"] = group_id;
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

  protected populateGroupFromJsonRoot(json: any, headers: any): this {
    const formatted_json = json["group"];
    return <this>this.populateObjectFromJson(formatted_json, headers);
  }
}
