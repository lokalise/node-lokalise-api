require('../setup');
import { expect } from 'chai';
import { TapeDeck } from 'mocha-tape-deck';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('Teams', function () {
  const deck = new TapeDeck('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});

  deck.createTest('list', async () => {
    const teams = await lokaliseApi.teams.list();

    expect(teams[0].team_id).to.eq(186612);
  }).register(this);

  deck.createTest('list_pagination', async () => {
    const teams = await lokaliseApi.teams.list({page: 2, limit: 1});

    expect(teams[0].team_id).to.eq(176692);
  }).register(this);
});