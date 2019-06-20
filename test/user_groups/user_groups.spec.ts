require('../setup');
import { expect } from 'chai';
import { TapeDeck } from 'mocha-tape-deck';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('UserGroups', function () {
  const deck = new TapeDeck('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});
  const team_id = 176692;
  const group_id = 515;
  const new_group_id = 762;
  const user_id = 20181;
  const project_id = '531138705d0ba0c18f5b43.63503311';

  deck.createTest('list', async () => {
    const user_groups = await lokaliseApi.userGroups.list({team_id: team_id, page: 1, limit: 1});

    expect(user_groups[0].group_id).to.eq(group_id);
  }).register(this);

  deck.createTest('get', async () => {
    const user_group = await lokaliseApi.userGroups.get(group_id, {team_id: team_id});

    expect(user_group.group_id).to.eq(group_id);
    expect(user_group.name).to.eq('Demo');
    expect(user_group.permissions.is_admin).to.be.true;
    expect(user_group.created_at).to.eq('2019-03-19 19:53:04 (Etc/UTC)');
    expect(user_group.created_at_timestamp).to.eq(1553025184);
    expect(user_group.team_id).to.eq(team_id);
    expect(user_group.projects).to.include(project_id);
    expect(user_group.members).to.include(user_id);
  }).register(this);

  deck.createTest('create', async () => {
    const user_group = await lokaliseApi.userGroups.create(
      {
        name: 'Node',
        is_reviewer: false,
        is_admin: true,
        admin_rights: ['upload']
      },
      {team_id: team_id}
    );

    expect(user_group.group_id).to.eq(new_group_id);
    expect(user_group.name).to.eq('Node');
    expect(user_group.permissions.is_admin).to.be.true;
  }).register(this);

  deck.createTest('update', async () => {
    const user_group = await lokaliseApi.userGroups.update(
      new_group_id,
      {
        name: 'Node updated',
        is_reviewer: false,
        is_admin: true,
        admin_rights: ['upload']
      },
      {team_id: team_id}
    );

    expect(user_group.group_id).to.eq(new_group_id);
    expect(user_group.name).to.eq('Node updated');
    expect(user_group.permissions.is_admin).to.be.true;
  }).register(this);

  deck.createTest('add_project_to_group', async () => {
    const user_group = await lokaliseApi.userGroups.add_projects_to_group(
      team_id,
      new_group_id,
      [project_id]
    );

    expect(user_group.group_id).to.eq(new_group_id);
    expect(user_group.projects).to.include(project_id);
  }).register(this);

  deck.createTest('remove_project_from_group', async () => {
    const user_group = await lokaliseApi.userGroups.remove_projects_from_group(
      team_id,
      new_group_id,
      [project_id]
    );

    expect(user_group.group_id).to.eq(new_group_id);
    expect(user_group.projects).not.to.include(project_id);
  }).register(this);

  deck.createTest('add_members_to_group', async () => {
    const user_group = await lokaliseApi.userGroups.add_members_to_group(
      team_id,
      new_group_id,
      [user_id]
    );

    expect(user_group.group_id).to.eq(new_group_id);
    expect(user_group.members).to.include(user_id);
  }).register(this);

  deck.createTest('remove_members_from_group', async () => {
    const user_group = await lokaliseApi.userGroups.remove_members_from_group(
      team_id,
      new_group_id,
      [user_id]
    );

    expect(user_group.group_id).to.eq(new_group_id);
    expect(user_group.members).not.to.include(user_id);
  }).register(this);

  deck.createTest('delete', async () => {
    const response = await lokaliseApi.userGroups.delete(new_group_id, {team_id: team_id});

    expect(response.team_id).to.eq(team_id);
    expect(response.group_deleted).to.be.true;
  }).register(this);
});