require('../setup');
import { expect } from 'chai';
import { TapeDeck } from 'mocha-tape-deck';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('Keys', function () {
  const deck = new TapeDeck('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});
  const project_id = '803826145ba90b42d5d860.46800099';
  const key_id = 15519786;
  const second_key_id = 15814906;

  deck.createTest('list', async () => {
    const keys = await lokaliseApi.keys.list({project_id: project_id});
    expect(keys[0].key_id).to.eq(key_id);
  }).register(this);

  deck.createTest('list_pagination', async () => {
    const keys = await lokaliseApi.keys.list({project_id: project_id, page: 2, limit: 3});
    expect(keys[0].key_id).to.eq(15814906);
  }).register(this);

  deck.createTest('get', async () => {
    const key = await lokaliseApi.keys.get(key_id,{project_id: project_id, disable_references: 1});
    expect(key.key_id).to.eq(key_id);
    expect(key.created_at).to.eq('2018-12-09 18:39:20 (Etc/UTC)');
    expect(key.created_at_timestamp).to.eq(1544380760);
    expect(key.key_name.ios).to.eq('another_k');
    expect(key.filenames.ios).to.eq('');
    expect(key.description).to.eq('');
    expect(key.platforms).to.include('ios');
    expect(key.tags).to.have.lengthOf(0);
    expect(key.comments[0].comment).to.eq('rspec comment');
    expect(key.screenshots).to.have.lengthOf(0);
    expect(key.translations[0].words).to.eq(4);
    expect(key.is_plural).to.be.false;
    expect(key.plural_name).to.eq('');
    expect(key.is_hidden).to.be.false;
    expect(key.is_archived).to.be.false;
    expect(key.context).to.eq('');
    expect(key.base_words).to.eq(3);
    expect(key.char_limit).to.eq(0);
    expect(key.custom_attributes).to.eq('');
  }).register(this);

  deck.createTest('create', async () => {
    const keys = await lokaliseApi.keys.create([
      {
        "key_name": "welcome_web",
        "description": "Index app welcome",
        "platforms": ["web"],
        "translations": [
          {
            "language_iso": "en",
            "translation": "Welcome"
          }
        ]
      },
      {
        "key_name": "welcome_ios",
        "description": "Welcome apple",
        "platforms": ["ios"],
        "is_plural": true,
        "translations": [
          {
            "language_iso": "en",
            "translation": {
              "one": "I have one apple",
              "other": "I have a lot of apples"
            }
          }
        ]
      }
    ], {project_id: project_id});

    expect(keys[0].key_name['web']).to.eq('welcome_web');
    expect(keys[0].platforms).to.include('web');
    expect(keys[0].translations[2].translation).to.eq('Welcome');

    expect(keys[1].key_name['ios']).to.eq('welcome_ios');
    expect(keys[1].platforms).to.include('ios');
    expect(keys[1].translations[2].language_iso).to.eq('en');
  }).register(this);

  deck.createTest('update', async () => {
    const key = await lokaliseApi.keys.update(key_id, {
      "platforms": ["web", "other"],
      "description": "Node updated"
    },{ project_id: project_id });

    expect(key.key_id).to.eq(key_id);
    expect(key.platforms).to.include("web", "other");
    expect(key.description).to.eq('Node updated');
  }).register(this);

  deck.createTest('bulk_update', async () => {
    const keys = await lokaliseApi.keys.bulk_update([
      {
        "key_id": key_id,
        "description": "Bulk node",
        "platforms": ["web"]
      },
      {
        "key_id": second_key_id,
        "description": "Second bulk",
      }
    ], { project_id: project_id});

    expect(keys[0].key_id).to.eq(key_id);
    expect(keys[0].description).to.eq('Bulk node');
    expect(keys[0].platforms).to.include('web');
    expect(keys[0].platforms).not.to.include('other');

    expect(keys[1].key_id).to.eq(second_key_id);
    expect(keys[1].description).to.eq('Second bulk');
  }).register(this);

  deck.createTest('delete', async () => {
    const response = await lokaliseApi.keys.delete(23677306, { project_id: project_id });

    expect(response.project_id).to.eq(project_id);
    expect(response.key_removed).to.be.true;
    expect(response.keys_locked).to.eq(0);
  }).register(this);

  deck.createTest('bulk_delete', async () => {
    const response = await lokaliseApi.keys.bulk_delete([
      23646011
    ], { project_id: project_id });

    expect(response.project_id).to.eq(project_id);
    expect(response.keys_removed).to.be.true;
    expect(response.keys_locked).to.eq(0);
  }).register(this);
});