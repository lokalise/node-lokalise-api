require('../setup');
import { expect } from 'chai';
import { Cassettes } from 'mocha-cassettes';
import { LokaliseApi } from '../../src/lokalise/lokalise';

describe('Files', function() {
  const cassette = new Cassettes('./test/cassettes')
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY })
  const project_id = '803826145ba90b42d5d860.46800099'
  const process_id = 'c23eb693ff46cd9a78310132dfbc6a42c93b0fc2'

  cassette.createTest('list', async () => {
    const files = await lokaliseApi.files.list({ project_id: project_id });
    const file = files[0];

    expect(file.filename).to.eq('%LANG_ISO%.yml');
    expect(file.key_count).to.eq(3);
  }).register(this);

  cassette.createTest('upload', async () => {
    const data = 'ewogICAgImZydWl0IjogIkFwcGxlIiwKICAgICJzaXplIjogIkxhcmdlIiwKICAgICJjb2xvciI6ICJSZWQiCn0=';
    const process = await lokaliseApi.files.upload(project_id,
      { data: data, filename: 'test_async.json', lang_iso: 'en' }
    )

    expect(process.process_id).to.eq(process_id)
    expect(process.type).to.eq('file-import')
    expect(process.status).to.eq('queued')
    expect(process.message).to.eq('')
    expect(process.created_by).to.eq(20181)
    expect(process.created_by_email).to.eq('bodrovis@protonmail.com')
    expect(process.created_at).to.eq('2020-05-15 11:16:48 (Etc/UTC)')
    expect(process.created_at_timestamp).to.eq(1589541408)
  }).register(this);

  cassette.createTest('upload asynchronous re-check', async () => {
    const process = await lokaliseApi.queuedProcesses.
      get(process_id, { project_id: project_id })

    expect(process.process_id).to.eq(process_id)
    expect(process.status).to.eq('finished')
    expect(process.details['files'].length).to.eq(1)
    const file = process.details['files'][0]
    expect(file.name_original).to.eq('test_async.json')
    expect(file.word_count_total).to.eq(3)
    expect(file.status).to.eq('finished')
  }).register(this)

  cassette.createTest('download', async () => {
    const response = await lokaliseApi.files.download(project_id,
      { format: 'json', "original_filenames": true }
    );

    expect(response.project_id).to.eq(project_id);
    expect(response.bundle_url).to.include('s3-eu-west-1.amazonaws.com');
  }).register(this);
});
