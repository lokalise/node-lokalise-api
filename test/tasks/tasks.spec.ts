require('../setup');
import { expect } from 'chai';
import { TapeDeck } from 'mocha-tape-deck';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('Tasks', function () {
  const deck = new TapeDeck('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});
  const project_id = '803826145ba90b42d5d860.46800099';
  const task_id = 11925;
  const new_task_id = 15526;

  deck.createTest('list', async () => {
    const tasks = await lokaliseApi.tasks.list({project_id: project_id});

    expect(tasks[0].task_id).to.eq(task_id);
  }).register(this);

  deck.createTest('list_pagination', async () => {
    const tasks = await lokaliseApi.tasks.list({project_id: project_id, page: 2, limit: 1});

    expect(tasks[0].task_id).to.eq(10001);
  }).register(this);

  deck.createTest('get', async () => {
    const task = await lokaliseApi.tasks.get(task_id, {project_id: project_id});

    expect(task.task_id).to.eq(task_id);
    expect(task.title).to.eq('Demo review');
    expect(task.can_be_parent).be.true;
    expect(task.task_type).to.eq('review');
    expect(task.parent_task_id).to.be.null;
    expect(task.closing_tags).to.have.lengthOf(0);
    expect(task.description).to.eq('');
    expect(task.status).to.eq('in progress');
    expect(task.progress).to.eq(1);
    expect(task.due_date).to.be.null;
    expect(task.due_date_timestamp).to.be.null;
    expect(task.keys_count).to.eq(16);
    expect(task.words_count).to.eq(275);
    expect(task.created_at).to.eq('2019-05-13 16:15:26 (Etc/UTC)');
    expect(task.created_at_timestamp).to.eq(1557764126);
    expect(task.created_by).to.eq(20181);
    expect(task.created_by_email).to.eq('bodrovis@protonmail.com');
    expect(task.languages[0].language_iso).to.eq('sq');
    expect(task.auto_close_languages).to.be.true;
    expect(task.auto_close_task).to.be.true;
    expect(task.completed_at).to.be.null;
    expect(task.completed_at_timestamp).to.be.null;
    expect(task.completed_by).to.be.null;
    expect(task.completed_by_email).to.be.null;
    expect(task.do_lock_translations).to.be.false;
    expect(task.custom_translation_status_ids).to.have.lengthOf(0);
  }).register(this);

  deck.createTest('create', async () => {
    const task = await lokaliseApi.tasks.create({
      title: 'node task',
      keys: [15519786],
      languages: [
        {
          "language_iso": "en",
          "users": [20181]
        }
      ]
    }, {project_id: project_id});

    expect(task.task_id).to.eq(new_task_id);
    expect(task.title).to.eq('node task');
    expect(task.languages[0].language_iso).to.eq('en');
  }).register(this);

  deck.createTest('update', async () => {
    const task = await lokaliseApi.tasks.update(
      task_id,
      {title: 'node updated'},
      {project_id: project_id}
    );

    expect(task.title).to.eq('node updated');
  }).register(this);

  deck.createTest('delete', async () => {
    const response = await lokaliseApi.tasks.delete(new_task_id, {project_id: project_id});

    expect(response.project_id).to.eq(project_id);
    expect(response.task_deleted).to.be.true;
  }).register(this);
});