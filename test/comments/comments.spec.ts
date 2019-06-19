require('../setup');
import { expect } from 'chai';
import { TapeDeck } from 'mocha-tape-deck';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('Comments', function () {
  const deck = new TapeDeck('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});
  const project_id = '803826145ba90b42d5d860.46800099';
  const key_id = 15519786;
  const comment_id = 800745;

  deck.createTest('list_project_comments', async () => {
    const comments = await lokaliseApi.comments.list_project_comments({project_id: project_id});

    expect(comments[0].comment_id).to.eq(comment_id);
  }).register(this);

  deck.createTest('list_key_comments', async () => {
    const comments = await lokaliseApi.comments.list({project_id: project_id, key_id: key_id});

    expect(comments[0].comment_id).to.eq(comment_id);
    expect(comments[0].key_id).to.eq(key_id);
  }).register(this);

  deck.createTest('get', async () => {
    const comment = await lokaliseApi.comments.get(comment_id, {project_id: project_id, key_id: key_id});

    expect(comment.comment_id).to.eq(comment_id);
    expect(comment.key_id).to.eq(key_id);
    expect(comment.comment).to.eq('rspec comment');
    expect(comment.added_by).to.eq(20181);
    expect(comment.added_by_email).to.eq('bodrovis@protonmail.com');
    expect(comment.added_at).to.eq('2018-12-09 18:41:31 (Etc/UTC)');
    expect(comment.added_at_timestamp).to.eq(1544380891);
  }).register(this);

  deck.createTest('create', async () => {
    const comments = await lokaliseApi.comments.create({
      'comments': [
        { comment: "Project comment 1" },
        { comment: "Project comment 2" }
      ]
    }, { project_id: project_id, key_id: key_id});

    expect(comments[0].comment).to.eq('Project comment 1');
  }).register(this);

  deck.createTest('delete', async () => {
    const response = await lokaliseApi.comments.delete(1312027,
      {project_id: project_id, key_id: key_id}
    );

    expect(response.project_id).to.eq(project_id);
    expect(response.comment_deleted).to.be.true;
  }).register(this);
});