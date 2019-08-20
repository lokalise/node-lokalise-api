import * as Collections from '../collections/index';

export class LocaliseApiMethods {
  // TODO: Lazy loading
  public comments = new Collections.Comments();
  public contributors = new Collections.Contributors();
  public files = new Collections.Files();
  public keys = new Collections.Keys();
  public languages = new Collections.Languages();
  public orders = new Collections.Orders();
  public paymentCards = new Collections.PaymentCards();
  public projects = new Collections.Projects();
  public screenshots = new Collections.Screenshots();
  public snapshots = new Collections.Snapshots();
  public tasks = new Collections.Tasks();
  public teams = new Collections.Teams();
  public teamUsers = new Collections.TeamUsers();
  public translationProviders = new Collections.TranslationProviders();
  public translations = new Collections.Translations();
  public translationStatuses = new Collections.TranslationStatuses();
  public userGroups = new Collections.UserGroups();
  public webhooks = new Collections.Webhooks();
}