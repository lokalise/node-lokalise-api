import { Project as ProjectInterface } from '../../src/models/project';
import { expect } from 'chai';
// import * as express from "express";
// import * as faker from 'faker';
import { TapeDeck } from 'mocha-tape-deck';
const rp = require("request-promise");
const { LokaliseApi } = require('../../dist/main');

describe('Projects', function () {

  let server;
  const deck = new TapeDeck('./test/cassettes');

  describe('List projects', () => {
    // tests are executed in reverse order that they're compiled in
    deck.createTest('projects can be listed', async () => {
      const lokaliseApi = new LokaliseApi({ apiKey: '44fd964aa8ac7196762d61a4949326fea38a5f60'});
      const projects = await lokaliseApi.projects.list();
      expect(projects).to.be.not.null;
    })
    .playCassette('projects_list')
    .register(this);
  });


   describe('Create projects', () => {
    // tests are executed in reverse order that they're compiled in
    deck.createTest('project can be created', async () => {
      const lokaliseApi = new LokaliseApi({ apiKey: '44fd964aa8ac7196762d61a4949326fea38a5f60'});
      const project = await lokaliseApi.projects.create({
        name: "Test name",
        description: "Test description"
      });
      expect(project).to.be.not.null;
      expect(project.name).to.equal("Test name");
      expect(project.description).to.equal("Test description");
    })
    .playCassette('projects_create')
    .register(this);
  });


  describe('Get a projects', () => {
    // tests are executed in reverse order that they're compiled in
    deck.createTest('project can be gotten', async () => {
      const lokaliseApi = new LokaliseApi({ apiKey: '44fd964aa8ac7196762d61a4949326fea38a5f60'});
      const project = await lokaliseApi.projects.get('479334065bfbef4ed4f6d7.99482900');
      expect(project).to.be.not.null;
      expect(project.name).to.equal("Sample Project");
      expect(project.description).to.equal("");
    })
    .playCassette('projects_get')
    .register(this);
  });

  describe('Update a projects', () => {
    // tests are executed in reverse order that they're compiled in
    deck.createTest('can be written', async () => {
      const lokaliseApi = new LokaliseApi({ apiKey: '44fd964aa8ac7196762d61a4949326fea38a5f60'});
      const project = await lokaliseApi.projects.update('136366185c376771890984.21179299', {
        name: 'Sample Project 1',
        description: 'Sample Project 1 description'
      });
      expect(project).to.be.not.null;
      expect(project.name).to.equal('Sample Project 1')      
      expect(project.description).to.equal('Sample Project 1 description')
    })
    .playCassette('projects_update')
    .register(this);
  });

  describe('Delete a projects', () => {
    // tests are executed in reverse order that they're compiled in
    deck.createTest('project can be deleted', async () => {
      const lokaliseApi = new LokaliseApi({ apiKey: '44fd964aa8ac7196762d61a4949326fea38a5f60'});
      const response = await lokaliseApi.projects.delete('884076135c596ca76660f7.68401661');
      expect(response).to.be.not.null;
      expect(response['project_id']).to.be.equal('884076135c596ca76660f7.68401661');
      expect(response['project_deleted']).to.be.equal(true)
    })
    .playCassette('projects_delete')
    .register(this);
  });
});
