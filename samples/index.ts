import { LokaliseApi } from "../dist/lokalise/lokalise_api";

const lokaliseApi = new LokaliseApi({ apiKey: "<apiKey>" });
const _projects = lokaliseApi
	.projects()
	.list()
	.catch((e) => {
		console.log(e);
	});
