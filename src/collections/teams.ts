import { BaseCollection } from "./base_collection.js";
import { Team } from "../models/team.js";

export class Teams extends BaseCollection {
  protected static rootElementName = "teams";
  protected static prefixURI = "teams";
  protected static elementClass = Team;
}
