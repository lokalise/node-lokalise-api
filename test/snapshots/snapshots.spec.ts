require('../setup');
import { expect } from 'chai';
import { TapeDeck } from 'mocha-tape-deck';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('Snapshots', function () {
  const deck = new TapeDeck('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});
  const project_id = '803826145ba90b42d5d860.46800099';
  const snapshot_id = 27882;
  const new_snapshot_id = 89351;

  deck.createTest('list', async () => {
    const snapshots = await lokaliseApi.snapshots.list({project_id: project_id, page: 1, limit: 1});

    expect(snapshots[0].snapshot_id).to.eq(snapshot_id);
  }).register(this);

  deck.createTest('create', async () => {
    const snapshot = await lokaliseApi.snapshots.create(
      {"title": "API snapshot"},
      {project_id: project_id}
    );

    expect(snapshot.snapshot_id).to.eq(new_snapshot_id);
    expect(snapshot.title).to.eq('API snapshot');
    expect(snapshot.created_by).to.eq(20181);
    expect(snapshot.created_by_email).to.eq('bodrovis@protonmail.com');
    expect(snapshot.created_at).to.eq('2019-06-20 15:01:49 (Etc/UTC)');
    expect(snapshot.created_at_timestamp).to.eq(1561042909);
  }).register(this);

  deck.createTest('restore', async () => {
    const response = await lokaliseApi.snapshots.restore(new_snapshot_id, {project_id: project_id});

    expect(response.project_id).to.eq('531138705d0ba0c18f5b43.63503311');
    expect(response.name).to.eq('Demo Phoenix copy');
  }).register(this);

  deck.createTest('delete', async () => {
    const response = await lokaliseApi.snapshots.delete(new_snapshot_id, {project_id: project_id});

    expect(response.project_id).to.eq(project_id);
    expect(response.snapshot_deleted).to.be.true;
  }).register(this);
});