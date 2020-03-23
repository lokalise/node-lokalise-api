import {ApiError} from "../../src/interfaces/api_error";

require('../setup');
import { expect } from 'chai';
import { Cassettes } from 'mocha-cassettes';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('Branches', function () {
  const deck = new Cassettes('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});
  const project_id = '803826145ba90b42d5d860.46800099';
  const branch_id = 41284;

  deck.createTest('error', async () => {
    const error = await lokaliseApi.branches.create({
      "name": "hotfix/really-important"
    }, { project_id: "803" }).catch((e: ApiError) => {
      expect(e.code).to.equal(401);
    });
  }).register(this);

  deck.createTest('list', async () => {
    const branches = await lokaliseApi.branches.list({project_id: project_id});

    expect(branches[0].branch_id).to.eq(branch_id);
  }).register(this);

  deck.createTest('get', async () => {
    const branch = await lokaliseApi.branches.get(branch_id, {project_id: project_id});

    expect(branch.branch_id).to.eq(branch_id);
    expect(branch.name).to.eq('hotfix/really-important');
    expect(branch.created_at).to.eq('2019-10-30 13:11:47 (Etc/UTC)');
    expect(branch.created_at_timestamp).to.eq(1572441107);
    expect(branch.created_by).to.eq(20181);
    expect(branch.created_by_email).to.eq('bodrovis@protonmail.com');
  }).register(this);

  deck.createTest('create', async () => {
    const branch = await lokaliseApi.branches.create({
      "name": "hotfix/really-important"
    }, { project_id: project_id});

    expect(branch.name).to.eq('hotfix/really-important');
  }).register(this);

  deck.createTest('update', async () => {
    const branch = await lokaliseApi.branches.update(branch_id, {
      "name": "hotfix/not-really-important"
    }, {project_id: project_id});

    expect(branch.name).to.eq('hotfix/not-really-important');
  }).register(this);

  deck.createTest('delete', async () => {
    const response = await lokaliseApi.branches.delete(branch_id,
      {project_id: project_id}
    );

    expect(response.project_id).to.eq(project_id);
    expect(response.branch_deleted).to.be.true;
  }).register(this);

  deck.createTest('merge', async () => {
    const branch_id_merge = 42303;
    const response = await lokaliseApi.branches.merge(branch_id_merge, {
      "force_conflict_resolve_using": "master"
    }, { project_id: project_id});

    expect(response.project_id).to.eq(project_id);
    expect(response.branch_merged).to.eq(true);
    expect(response.branch['branch_id']).to.eq(branch_id_merge);
  }).register(this);
});
