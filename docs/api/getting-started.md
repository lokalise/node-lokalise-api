# Getting Started

## Installation and Requirements

This gem requires [Ruby 2.4+](https://www.ruby-lang.org/en/) and [RubyGems package manager](https://rubygems.org/pages/download).

Install it by running:

    gem install ruby-lokalise-api

## Initializing the Client

In order to perform API requests, you require a special token that can be obtained in your [personal profile](https://lokalise.com/profile#apitokens) (*API tokens* section).

After you've obtained the token, initialize the client:

```ruby
require 'ruby-lokalise-api'

@client = Lokalise.client 'YOUR_TOKEN_HERE'
```

Now the `@client` can be used to perform API requests! Learn more about additional options in the [Customizing request section](#customizing-request).

## Objects and models

Individual objects are represented as instances of Ruby classes which are called *models*. Each model responds to the methods that are named after the API object's attributes. [This file](https://github.com/lokalise/ruby-lokalise-api/blob/master/lib/ruby-lokalise-api/data/attributes.json) lists all objects and their methods.

Here is an example:

```ruby
project = client.project '123'
project.name
project.description
project.created_by
```

Many resources have common methods like `project_id` and `branch`:

```ruby
webhook = client.webhook project_id, '123.abc'
webhook.project_id
webhook.branch
```

To get access to raw data returned by the API, use `#raw_data`:

```ruby
project.raw_data
```

Models support method chaining, meaning you can fetch a resource, update and delete it in one line:

```ruby
@client.project('123').update(name: 'New name').destroy
```

### Reloading data

Most of the resources can be reloaded using the `#reload_data` method. This method will fetch the latest data for the resource:

```ruby
project = client.project '123'
# do something else...
# project might be updated via UI, so load new data:
reloaded_project = project.reload_data
# now `reloaded_project` has fresh data from the API
```

## Collections of resources and pagination

Fetching (or creating/updating) multiple objects will return a *collection* of objects. To get access to the actual data, use the `#collection` method:

```ruby
project = @client.projects.collection.first # => Get the first project
project.name
```

Bulk fetches support [pagination](https://app.lokalise.com/api2docs/curl/#resource-pagination). There are two common parameters available:

* `:limit` (defaults to `100`, maximum is `5000`) - number of records to display per page
* `:page` (defaults  to `1`) - page to fetch

```ruby
projects = @client.projects limit: 10, page: 3 #=> Paginate by 10 records and fetch the third page
```

Collections respond to the following methods:

* `#total_pages`
* `#total_results`
* `#results_per_page`
* `#current_page`
* `#next_page?`
* `#last_page?`
* `#prev_page?`
* `#first_page?`

For example:

```ruby
projects.current_page #=> 3
projects.last_page? #=> true, this is the last page and there are no more projects available
```

On top of that, you may easily fetch the next or the previous page of the collection by using:

* `#next_page`
* `#prev_page`

These methods return instances of the same collection class or `nil` if the next/previous page is unavailable. Methods respect the parameters you've initially passed:

```ruby
translations = @client.translations 'project_id', limit: 4, page: 2, disable_references: 0 # => we passed three parameters here

translations.prev_page # => will load the previous page while preserving the `limit` and `disable_references` params
```

## Branching

If you are using [project branching feature](https://docs.lokalise.com/en/articles/3391861-project-branching), simply add branch name separated by semicolon to your project ID in any endpoint to access the branch. For example, in order to access `new-feature` branch for the project with an id `123abcdef.01`:

```ruby
@client.files '123abcdef.01:new-feature'
```
