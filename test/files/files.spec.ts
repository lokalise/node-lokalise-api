import { expect } from 'chai';
// import * as express from "express";
// import * as faker from 'faker';
import { TapeDeck } from 'mocha-tape-deck';
const rp = require("request-promise");
const { LokaliseApi } = require('../../index');

describe('Files', function () {

  let server;
  const deck = new TapeDeck('./test/cassettes');

  describe('List files', () => {
    deck.createTest('files can be listed', async () => {
      const lokaliseApi = new LokaliseApi({ apiKey: '159f62ee3930de0a4452073e26e5e288c026dfa5'});
      const projects = await lokaliseApi.files.list({ project_id: '505512295c596b25bce8d4.33297803'});
      expect(projects).to.be.not.null;
    })
    .playCassette('files_list')
    .register(this);
  });

  describe('Upload files', () => {
    deck.createTest('files can be uploaded', async () => {
      const lokaliseApi = new LokaliseApi({ apiKey: '159f62ee3930de0a4452073e26e5e288c026dfa5'});
      const projects = await lokaliseApi.files.upload('505512295c596b25bce8d4.33297803', { data: 'ewogICAgImZydWl0IjogIkFwcGxlIiwKICAgICJzaXplIjogIkxhcmdlIiwKICAgICJjb2xvciI6ICJSZWQiCn0=', filename: 'test1.json', lang_iso: 'en'});
      expect(projects).to.be.not.null;
    })
    .playCassette('files_upload')
    .register(this);
  });

  describe('Download files', () => {
    deck.createTest('files can be downloaded', async () => {
      const lokaliseApi = new LokaliseApi({ apiKey: '159f62ee3930de0a4452073e26e5e288c026dfa5'});
      const projects = await lokaliseApi.files.download('505512295c596b25bce8d4.33297803', { format: 'json', "original_filenames": true });
      expect(projects).to.be.not.null;1
    })
    .playCassette('files_download')
    .register(this);
  });

});
