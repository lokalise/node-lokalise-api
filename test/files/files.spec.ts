require('../setup');
import { expect } from 'chai';
import { Cassettes } from 'mocha-cassettes';
import { LokaliseApi } from '../../src/lokalise/lokalise';

describe('Files', function () {
  const cassette = new Cassettes('./test/cassettes')
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY})
  const project_id = '803826145ba90b42d5d860.46800099'
  const process_id = 'c0f2ea978ac6382f46babfd5de844062835280f8'

  cassette.createTest('list', async () => {
    const files = await lokaliseApi.files.list({ project_id: project_id});
    const file = files[0];

    expect(file.filename).to.eq('%LANG_ISO%.yml');
    expect(file.key_count).to.eq(3);
  }).register(this);

  cassette.createTest('upload', async () => {
    const data = 'ewogICAgImZydWl0IjogIkFwcGxlIiwKICAgICJzaXplIjogIkxhcmdlIiwKICAgICJjb2xvciI6ICJSZWQiCn0=';
    const process = await lokaliseApi.files.upload(project_id,
      {data: data, filename: 'test_async.json', lang_iso: 'en'}
    )

    expect(process.process_id).to.eq(process_id)
    expect(process.type).to.eq('file-import')
    expect(process.status).to.eq('queued')
    expect(process.message).to.eq('')
    expect(process.created_by).to.eq('20181')
     expect(process.created_by_email).to.eq('bodrovis@protonmail.com')
     expect(process.created_at).to.eq('2020-05-14 10:00:09 (Etc/UTC)')
     expect(process.created_at_timestamp).to.eq(1589450409)
     expect(process.url).to.eq('/api2/projects/803826145ba90b42d5d860.46800099/processes/file-import/c0f2ea978ac6382f46babfd5de844062835280f8')
  }).register(this);

  cassette.createTest('upload asynchronous re-check', async () => {
    const process = await lokaliseApi.queuedProcesses.
      getDetailed(process_id, { project_id: project_id })

    expect(process.process_id).to.eq(process_id)
    expect(process.status).to.eq('finished')
    expect(process.files.length).to.eq(1)
    const file = process.files[0]
    expect(file.name_original).to.eq('test_async.json')
    expect(file.word_count_total).to.eq(3)
  }).register(this)

  cassette.createTest('download', async () => {
    const response = await lokaliseApi.files.download(project_id,
      { format: 'json', "original_filenames": true }
    );

    expect(response.project_id).to.eq(project_id);
    expect(response.bundle_url).to.include('s3-eu-west-1.amazonaws.com');
  }).register(this);
});
