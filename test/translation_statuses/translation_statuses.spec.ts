require('../setup');
import { expect } from 'chai';
import { TapeDeck } from 'mocha-tape-deck';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('TranslationStatuses', function () {
  const deck = new TapeDeck('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});
  const project_id = '803826145ba90b42d5d860.46800099';
  const new_status_id = 131;

  deck.createTest('list', async () => {
    const statuses = await lokaliseApi.translationStatuses.list({project_id: project_id});
    expect(statuses[0].title).to.eq('random');
  }).register(this);

  deck.createTest('list_pagination', async () => {
    const statuses = await lokaliseApi.translationStatuses.list({
      project_id: project_id, page: 2, limit: 1
    });
    expect(statuses[0].title).to.eq('tested');
  }).register(this);

  deck.createTest('get', async () => {
    const id = 128;
    const status = await lokaliseApi.translationStatuses.get(id, {project_id: project_id});
    expect(status.status_id).to.eq(id);
    expect(status.title).to.eq('random');
    expect(status.color).to.eq('#0079bf');
  }).register(this);

  deck.createTest('create', async () => {
    const status = await lokaliseApi.translationStatuses.create(
      {title: 'node', color: '#344563'},
      {project_id: project_id});

    expect(status.status_id).to.eq(new_status_id);
    expect(status.title).to.eq('node');
    expect(status.color).to.eq('#344563');
  }).register(this);

  deck.createTest('update', async () => {
    const status = await lokaliseApi.translationStatuses.update(
      new_status_id,
      {title: 'node updated'},
      {project_id: project_id}
    );

    expect(status.title).to.eq('node updated');
  }).register(this);

  deck.createTest('delete', async () => {
    const response = await lokaliseApi.translationStatuses.delete(new_status_id,
      {project_id: project_id});

    expect(response.project_id).to.eq(project_id);
    expect(response.custom_translation_status_deleted).to.be.true;
  }).register(this);

  deck.createTest('available_colors', async () => {
    const colors = await lokaliseApi.translationStatuses.available_colors({project_id: project_id});
    expect(colors['colors']).to.include('#f2d600');
  }).register(this);
});