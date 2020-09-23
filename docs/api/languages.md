# Languages

[Language attributes](https://app.lokalise.com/api2docs/curl/#object-languages)

## Fetch system languages

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-system-languages-get)

```ruby
@client.system_languages(params = {})   # Input:
                                        ## params (hash)
                                        ### :page and :limit
                                        # Output:
                                        ## Collection of system languages supported by Lokalise
```

## Fetch project languages

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-project-languages-get)

```ruby
@client.project_languages(project_id, params = {})    # Input:
                                                      ## project_id (string, required)
                                                      ## params (hash)
                                                      ### :page and :limit
                                                      # Output:
                                                      ## Collection of languages available in the given project
```

## Fetch a single project language

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-language-get)

```ruby
@client.language(project_id, language_id)     # Input:
                                              ## project_id (string, required)
                                              ## language_id (string, required)
                                              # Output:
                                              ## A single language in the given project
```

## Create project languages

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-languages-post)

```ruby
@client.create_languages(project_id, params)    # Input:
                                                ## project_id (string, required)
                                                ## params (array of hashes or hash, required) - contains parameter of newly created languages. Pass array of hashes to create multiple languages, or a hash to create a single language
                                                ### :lang_iso (string, required)
                                                ### :custom_iso (string)
                                                ### :custom_name (string)
                                                ### :custom_plural_forms (array) - can contain only plural forms initially supported by Lokalise
                                                # Output:
                                                ## Collection of newly created languages
```

## Update project language

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-language-put)

```ruby
@client.update_language(project_id, language_id, params)    # Input:
                                                            ## project_id (string, required)
                                                            ## language_id (string, required)
                                                            ## params (hash, required)
                                                            ### :lang_iso (string, required)
                                                            ### :custom_name (string)
                                                            ### :plural_forms (array) - can contain only plural forms initially supported by Lokalise
                                                            # Output:
                                                            ## Updated language
```

Alternatively:

```ruby
language = @client.language('project_id', 'lang_id')
language.update(params)
```

## Delete project language

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-language-delete)

```ruby
@client.destroy_language(project_id, language_id)    # Input:
                                                     ## project_id (string, required)
                                                     ## language_id (string, required)
                                                     # Output:
                                                     ## Hash with the project's id and "language_deleted"=>true
```

Alternatively:

```ruby
language = @client.language('project_id', 'lang_id')
language.destroy
```
