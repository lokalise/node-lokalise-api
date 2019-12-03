const { LokaliseApi } = require('../dist/lokalise/lokalise');

const lokaliseApi = new LokaliseApi({ apiKey: '<apiKey>' });
const projects = lokaliseApi.projects.list().catch(
  (e) => {
    console.log(e);
  }
);

