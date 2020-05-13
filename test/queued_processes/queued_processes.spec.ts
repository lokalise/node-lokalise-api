require('../setup');
import { expect } from 'chai';
import { Cassettes } from 'mocha-cassettes';
import { LokaliseApi } from '../../src/lokalise/lokalise';

describe('QueuedProcesses', function() {
  const cassette = new Cassettes('./test/cassettes')
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY })
  const project_id = '803826145ba90b42d5d860.46800099'
  const process_id = '4191a4e54cb6433193e75eed55359c4021e6aa91'

  cassette.createTest('list', async () => {
    const processes = await lokaliseApi.queuedProcesses.
      list({ project_id: project_id })
    expect(processes.length).to.eq(3)
    expect(processes[0].process_id).to.eq(process_id)
  }).register(this)

  cassette.createTest('get', async () => {
    const process = await lokaliseApi.queuedProcesses.
      get(process_id, { project_id: project_id })

    expect(process.process_id).to.eq(process_id)
    expect(process.type).to.eq('file-import')
    expect(process.status).to.eq('finished')
    expect(process.message).to.eq('')
    expect(process.created_by).to.eq('20181')
    expect(process.created_by_email).to.eq('bodrovis@protonmail.com')
    expect(process.created_at).to.eq('2020-05-11 11:17:52 (Etc/UTC)')
    expect(process.created_at_timestamp).to.eq(1589195872)
    expect(process.url).to.eq('/api2/projects/803826145ba90b42d5d860.46800099/processes/file-import/4191a4e54cb6433193e75eed55359c4021e6aa91')
  }).register(this)

  cassette.createTest('getDetailed', async () => {
    const process = await lokaliseApi.queuedProcesses.
      getDetailed(process_id, { project_id: project_id })

    expect(process.process_id).to.eq(process_id)
    expect(process.type).to.eq('file-import')
    const file = process.files[0]
    expect(file.status).to.eq('finished')
    expect(file.name_original).to.eq('en.json')
    expect(file.name_custom).to.eq('%LANG_ISO%.json')
    expect(file.word_count_total).to.eq(16)
  }).register(this)

  cassette.createTest('getDetailed with type', async () => {
    const process = await lokaliseApi.queuedProcesses.
      getDetailed(process_id, { project_id: project_id }, 'file-import')

    expect(process.process_id).to.eq(process_id)
    expect(process.type).to.eq('file-import')
    const file = process.files[0]
    expect(file.status).to.eq('finished')
  }).register(this)
});
