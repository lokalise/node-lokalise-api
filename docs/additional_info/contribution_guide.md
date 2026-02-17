---
---
# Contributing

1. [Fork the repository.][fork]
2. [Create a topic branch.][branch]
3. Implement your feature or bug fix.
4. Don't forget to add tests and make sure they pass (`npm test`)
5. Run linter `npm run lint:fix`.
6. If necessary, add documentation for your feature or bug fix.
7. Commit and push your changes.
8. [Submit a pull request.][pr]

[fork]: http://help.github.com/fork-a-repo/
[branch]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-branches
[pr]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests

## Building

1. Run `npm run-script build`
2. Browse `dist/` folder

## Running tests

This library is tested with [Node 20+](https://github.com/lokalise/node-lokalise-api/blob/master/.travis.yml). To test it locally:

1. Copypaste `.env.example` file as `.env`. Put your API token inside. The `.env` file is excluded from version control so your token is safe. All in all, we use pre-recorded cassettes, so the actual API requests won't be sent. However, providing at least some token is required.
2. Run `npm test`. Observe test results and coverage.

## Previewing the docs locally

1. Clone the repo.
2. `cd docs`
3. `bundle exec jekyll serve --baseurl='' --config _config.dev.yml`.
4. Navigate to `http://localhost:4000` and observe the docs.
