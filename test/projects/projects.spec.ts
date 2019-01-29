import { Project as ProjectInterface } from '../../src/models/project';
import { expect } from 'chai';
import * as express from "express";
import * as faker from 'faker';
import { TapeDeck } from 'mocha-tape-deck';

describe('Project Interface', () => {

  let project: ProjectInterface;
  let project_id: number;
  let name:string;
  let description:string;
  let team_id:number;
  let created_at:string;
  let created_by:number;
  let created_by_email;

  let server;
  const deck = new TapeDeck('./cassettes');
  let response;


  beforeEach(() => {
    this.project_id = faker.random.number();
    this.name = faker.lorem.sentence();
    this.description = faker.lorem.sentence();
    this.team_id = faker.random.number();
    this.created_at = faker.date.recent();
    this.created_by = faker.random.number();
    this.created_by_email = faker.random.word();

    this.project = {
        project_id: this.project_id,
        name: this.name,
        description: this.description,
        team_id: this.team_id,
        created_by_email: this.created_by_email,
        created_at: this.created_at,
        created_by: this.created_by
    };

    const app = express();
  });

  it('should be valid', () => {
    expect(this.project.project_id).to.equal(this.project_id);
    expect(this.project.name).to.equal(this.name);
    expect(this.project.description).to.equal(this.description);
    expect(this.project.team_id).to.equal(this.team_id);
    expect(this.project.created_by_email).to.equal(this.created_by_email);
    expect(this.project.created_at).to.equal(this.created_at);
    expect(this.project.created_by).to.equal(this.created_by);
  });
});
