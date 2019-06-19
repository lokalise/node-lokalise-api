require('../setup');
import { expect } from 'chai';
import { TapeDeck } from 'mocha-tape-deck';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('Contributors', function () {
  const deck = new TapeDeck('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});
  const project_id = '803826145ba90b42d5d860.46800099';
  const user_id = 20181;

  deck.createTest('list', async () => {
    const contributors = await lokaliseApi.contributors.list({project_id: project_id});

    expect(contributors[0].user_id).to.eq(user_id);
  }).register(this);
});