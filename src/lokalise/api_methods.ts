import * as Collectons from '../collections/index';

export class LocaliseApiMethods {
  // TODO: Lazy loading
  public comments = new Collectons.Comments();
  public contributors = new Collectons.Contributors();
  public files = new Collectons.Files()
  public keys = new Collectons.Keys();
  public languages = new Collectons.Languages();
  public projects = new Collectons.Projects();
  public screenshots = new Collectons.Screenshots();
  public snapshots = new Collectons.Snapshots();
  public tasks = new Collectons.Tasks();
  public teamUsers = new Collectons.TeamUsers();
  public userGroups = new Collectons.UserGroups();
  public translations = new Collectons.Translations();
}