require('../setup');
import { expect } from 'chai';
import { TapeDeck } from 'mocha-tape-deck';
const { LokaliseApi } = require('../../src/lokalise/lokalise');

describe('Screenshots', function () {
  const deck = new TapeDeck('./test/cassettes');
  const lokaliseApi = new LokaliseApi({apiKey: process.env.API_KEY});
  const project_id = '803826145ba90b42d5d860.46800099';
  const key_id = 15519786;
  const second_screenshot_id = 189268;
  const screenshot_id = 189213;
  const data = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAAgCAIAAACw8uBbAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASdEVYdFNvZnR3YXJlAEdyZWVuc2hvdF5VCAUAAALkSURBVGhD7ZnNattAEIDzAO65r+CWtNCrqWUby01SHISVCqMeQujBhda0hlx8co6pDy0Un9pT60AuPRZKUK59APeNOquR5NXoZ7XyOnJgzYeQRrOzu99uJIj2Hjwycnj42PjZ7P1pH8DxSdOafflGIPlArf7u0rsem00Sz6d2uvCuLp7VJVuxvrzb8Od5C0uyAo/12SsxBkS2rcA7sP+0DdLhSOJZyHqvmRc/PPhJL5USavVX46tg5WSXbZO2Yu+abaC9V8Pe81ZHc/do79WgvVeDhPf351M4Xi6+8/AJmuIU9Q7S0TIvHSOaEhTyjtLRcmQ8imhKIPYeSUfL0XkU2QUaxtFy5MzNNomXQGGpHKTfq/fduzBzV7wT0QSSXBXaO4zbnJ+5/96+BpZ9NnoSwYktXWc1GkyMdsM8vhmxu3jJ8uORQIQ9wAo3tplVc94PGmIOX4pLCy5X7hHm+NXWQ/rYPEwtpRbp54x1MhR47w/iU2KC+NHj5EN9vi9/c0FDCGZEXKzJiuNi0F78nLPjId5aL5gbrD1bAFaWr0+ac0MKS4Wt+GQlZHr/1O39PThMAnHypiXgFotE+5fBRg4i3Mz5/Yh7MCXC54fntJfMnHXXE5etAZ8Zkdocb2ErPFdIpneim+elNcjxjgxtB6yxeYq9x+/m58elrHtJy9ncO/6x3qn3adckuhGIT6YzoXcApPhPidTnDD/J5N38/Ji1sJeUHCyF1qI1yM7kg8EAkptAFXnP968mfdRAZPThPJKe6h0er8EjIhwxzgSDyR3nzy32riORhBTfVLyX1By+1IrrETY+qZxsDu9YrL+NzQ4I3qu/ei8i6XDunr7hpad61xRB4N1sdX776uFoWzaRDpB8TUEE3gGn0wXpcCRxzSaIvWu2gfZeDdp7NWjv1aC9V4OEd/19VSFFvevvq2op5F1/X1WO2PvufF9tGOOFdz1zFPzDRGGpcki/V++Fd2Fmxd5bnf90pEGocXtKKgAAAABJRU5ErkJggg==';

  deck.createTest('list', async () => {
    const screenshots = await lokaliseApi.screenshots.list({project_id: project_id, page: 1, limit: 1});

    expect(screenshots[0].screenshot_id).to.eq(screenshot_id);
    expect(screenshots[0].key_ids).to.include(key_id);
  }).register(this);

  deck.createTest('get', async () => {
    const screenshot = await lokaliseApi.screenshots.get(screenshot_id, {project_id: project_id});

    expect(screenshot.screenshot_id).to.eq(screenshot_id);
    expect(screenshot.key_ids).to.include(key_id);
    expect(screenshot.title).to.eq('node screen');
    expect(screenshot.description).to.eq('node desc');
    expect(screenshot.url).to.include('s3-eu-west-1.amazonaws.com');
    expect(screenshot.width).to.eq(125);
    expect(screenshot.height).to.eq(32);
    expect(screenshot.created_at).to.eq('2019-06-20 14:38:03 (Etc/UTC)');
    expect(screenshot.created_at_timestamp).to.eq(1561041483);
  }).register(this);

  deck.createTest('create', async () => {
    const screenshots = await lokaliseApi.screenshots.create([
      {
        data: data,
        "ocr": false,
        "key_ids": [key_id],
        "tags": ["onboarding"]
      }
    ],{project_id: project_id});

    expect(screenshots[0].screenshot_id).to.eq(second_screenshot_id);
    expect(screenshots[0].key_ids).to.include(key_id);
  }).register(this);

  deck.createTest('update', async () => {
    const screenshot = await lokaliseApi.screenshots.update(screenshot_id,
      {title: 'node screen', description: 'node desc'},
      {project_id: project_id}
    );

    expect(screenshot.screenshot_id).to.eq(screenshot_id);
    expect(screenshot.title).to.eq('node screen');
    expect(screenshot.description).to.eq('node desc');
  }).register(this);

   deck.createTest('delete', async () => {
     const response = await lokaliseApi.screenshots.delete(second_screenshot_id,
      {project_id: project_id}
    );

    expect(response.project_id).to.eq(project_id);
    expect(response.screenshot_deleted).to.be.true;
  }).register(this);
});