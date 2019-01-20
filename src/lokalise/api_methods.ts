import { Comments } from '../endpoints/comments';
import * as Models from '../models/index';

export class LocaliseApiMethods {
  public comments = new Models.Comments();
  public contributors = new Models.Contributors();
  public files = new Models.Files()
  public keys = new Models.Keys();
  public languages = new Models.Languages();
  public projects = new Models.Projects();
  public screenshots = new Models.Screenshots();
  public snapshots = new Models.Snapshots();
  public tasks = new Models.Tasks();
  public teamUsers = new Models.TeamUsers();
  public userGroups = new Models.UserGroups();
  public translations = new Models.Translations();
}