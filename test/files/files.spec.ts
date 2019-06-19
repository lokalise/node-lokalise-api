require('../setup');
import { expect } from 'chai';
import { TapeDeck } from 'mocha-tape-deck';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('Files', function () {
  const deck = new TapeDeck('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});
  const project_id = '803826145ba90b42d5d860.46800099';

  deck.createTest('list', async () => {
    const files = await lokaliseApi.files.list({ project_id: project_id});
    const file = files[0];

    expect(file.filename).to.eq('%LANG_ISO%.yml');
    expect(file.key_count).to.eq(3);
  }).register(this);

  deck.createTest('upload', async () => {
    const data = 'ewogICAgImZydWl0IjogIkFwcGxlIiwKICAgICJzaXplIjogIkxhcmdlIiwKICAgICJjb2xvciI6ICJSZWQiCn0=';
    const response = await lokaliseApi.files.upload(project_id,
      {data: data, filename: 'test1.json', lang_iso: 'en'}
    );

    expect(response.project_id).to.eq(project_id);
    expect(response.file).to.eq('test1.json');
    expect(response.result['inserted']).to.eq(3);
  }).register(this);

  deck.createTest('download', async () => {
    const response = await lokaliseApi.files.download(project_id,
      { format: 'json', "original_filenames": true }
    );

    expect(response.project_id).to.eq(project_id);
    expect(response.bundle_url).to.include('s3-eu-west-1.amazonaws.com');
  }).register(this);
});
