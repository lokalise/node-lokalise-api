require('../setup');
import { expect } from 'chai';
import { TapeDeck } from 'mocha-tape-deck';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('Translations', function () {
  const deck = new TapeDeck('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});
  const project_id = '803826145ba90b42d5d860.46800099';
  const translation_id = 79607647;

  deck.createTest('list', async () => {
    const translations = await lokaliseApi.translations.list({project_id: project_id});

    expect(translations[0].translation_id).to.eq(translation_id);
  }).register(this);

  deck.createTest('list_pagination', async () => {
    const translations = await lokaliseApi.translations.list(
      {project_id: project_id, page: 2, limit: 1}
    );

    expect(translations[0].translation_id).to.eq(80015148);
  }).register(this);

  deck.createTest('get', async () => {
    const translation = await lokaliseApi.translations.get(translation_id, {project_id: project_id});

    expect(translation.translation_id).to.eq(translation_id);
    expect(translation.key_id).to.eq(15519786);
    expect(translation.language_iso).to.eq('ru');
    expect(translation.translation).to.eq('Ещё один английский ключ');
    expect(translation.modified_by).to.eq(33599);
    expect(translation.modified_by_email).to.eq('twilight_church@list.ru');
    expect(translation.modified_at).to.eq('2019-05-13 16:13:34 (Etc/UTC)');
    expect(translation.modified_at_timestamp).to.eq(1557764014);
    expect(translation.is_reviewed).to.be.true;
    expect(translation.reviewed_by).to.eq(33599);
    expect(translation.is_fuzzy).to.be.false;
    expect(translation.words).to.eq(4);
    expect(translation.custom_translation_statuses).to.have.lengthOf(0);
  }).register(this);

  deck.createTest('update', async () => {
    const translation = await lokaliseApi.translations.update(
      translation_id,
      {translation: 'тест'},
      {project_id: project_id}
    );

    expect(translation.translation_id).to.eq(translation_id);
    expect(translation.translation).to.eq('тест');
  }).register(this);
});