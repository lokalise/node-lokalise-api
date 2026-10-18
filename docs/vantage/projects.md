---
---
# Projects

## List projects

[API doc](https://developers.lokalise.com/reference/get_v1-teams-teamid-projects)

```js
const projects = await lokaliseVantageApi.projects().list({ team_id });

projects.items[0]name; // "Sample"
```

## Fetch a project

[API doc](https://developers.lokalise.com/reference/get_v1-projects-projectid)

```js
const project = await lokaliseVantageApi.projects().get({ project_id });

project.name; // "Sample"
```

## List project languages

[API doc](https://developers.lokalise.com/reference/get_v1-projects-projectid-languages)

```js
const languages = await lokaliseVantageApi
  .projectLanguages()
  .list({ project_id });

const language = languages[0];

language; // {
//   languageId: "123d29d9-de52-7ba2-87c6-b5355ebf567",
//   locale: "en",
//   languageName: "English",
//   isRtl: false,
// }
```