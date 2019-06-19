require('../setup');
import { expect } from 'chai';
import { TapeDeck } from 'mocha-tape-deck';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('Orders', function () {
  const deck = new TapeDeck('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});
  const team_id = 176692;
  const order_id = '201903198B2';

  deck.createTest('list', async () => {
    const orders = await lokaliseApi.orders.list({team_id: team_id});
    expect(orders[0].order_id).to.eq(order_id);
  }).register(this);

  deck.createTest('list_pagination', async () => {
    const orders = await lokaliseApi.orders.list({team_id: team_id, page: 2, limit: 1});
    expect(orders[0].order_id).to.eq('20190611AC2');
  }).register(this);

  deck.createTest('get', async () => {
    const order = await lokaliseApi.orders.get(order_id,{team_id: team_id});
    expect(order.order_id).to.eq(order_id);
    expect(order.project_id).to.eq('803826145ba90b42d5d860.46800099');
    expect(order.card_id).to.eq('1774');
    expect(order.status).to.eq('completed');
    expect(order.created_at).to.eq('2019-03-19 18:18:21 (Etc/UTC)');
    expect(order.created_at_timestamp).to.eq(1553019501);
    expect(order.created_by).to.eq(20181);
    expect(order.created_by_email).to.eq('bodrovis@protonmail.com');
    expect(order.source_language_iso).to.eq('en');
    expect(order.target_language_isos).to.include('ru');
    expect(order.keys).to.include(15519786);
    expect(order.source_words['ru']).to.eq(1);
    expect(order.provider_slug).to.eq('gengo');
    expect(order.translation_style).to.eq('friendly');
    expect(order.translation_tier).to.eq(1);
    expect(order.translation_tier_name).to.eq('Professional translator');
    expect(order.briefing).to.eq('Some briefing');
    expect(order.total).to.eq(0.07);
  }).register(this);

  deck.createTest('create', async () => {
    const order = await lokaliseApi.orders.create({
      project_id: '803826145ba90b42d5d860.46800099',
      card_id: '1774',
      briefing: 'Nothing specific',
      source_language_iso: 'en',
      target_language_isos: ['nl'],
      keys: [15519786],
      provider_slug: 'gengo',
      translation_tier: '1'
    },{team_id: team_id});

    expect(order.status).to.eq('in progress');
    expect(order.created_by).to.eq('20181');
  }).register(this);
});