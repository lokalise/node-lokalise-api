# Translation files

[File attributes](https://app.lokalise.com/api2docs/curl/#object-files)

## Fetch translation files

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-files-get)

```ruby
@client.files(project_id, params = {})  # Input:
                                        ## project_id (string, required)
                                        ## params (hash)
                                        ### :page and :limit
                                        # Output:
                                        ## Collection of translation files available in the given project
```

## Download translation files

[Doc](https://app.lokalise.com/api2docs/curl/#transition-download-files-post)

Exports project files as a `.zip` bundle and makes them available to download (the link is valid for 12 months).

```ruby
@client.download_files(project_id, params)  # Input:
                                        ## project_id (string, required)
                                        ## params (hash, required)
                                        ### :format (string, required) - one of the file formats supported by Lokalise (json, xml, po etc).
                                        ### Find the list of other supported params at https://app.lokalise.com/api2docs/curl/#transition-download-files-post
                                        # Output:
                                        ## Hash with the project id and a "bundle_url" link
```

## Upload translation file

[Doc](https://app.lokalise.com/api2docs/curl/#transition-upload-a-file-post)

Starting from July 2020, **background uploading is the only method of importing translation files**.

```ruby
@client.upload_file(project_id, params) # Input:
                                        ## project_id (string, required)
                                        ## params (hash, required)
                                        ### :data (string, required) - base64-encoded data (the format must be supported by Lokalise)
                                        ### :filename (string, required)
                                        ### :lang_iso (string, required)
                                        ### Find the list of other supported params at https://app.lokalise.com/api2docs/curl/#transition-upload-a-file-post
                                        # Output:
                                        ## QueuedProcess resource
```

A `QueuedProcess` resource will be returned. This resource contains a status of the import job, process ID to manually check the status, and some other attributes:

```ruby
queued_process = @client.upload_file project_id,
                                     data: 'Base-64 encoded data... ZnI6DQogI...',
                                     filename: 'my_file.yml',
                                     lang_iso: 'en'

queued_process.status # => 'queued'
queued_process.process_id # => 'ff1876382b7ba81f2bb465da8f030196ec401fa6'
```

Your job is to periodically reload data for the queued process and check the `status` attribute:

```ruby
reloaded_process = queued_process.reload_data # loads new data from the API
reloaded_process.status # => 'finished'
```

Alternatively, you may use the `queued_process` method:

```ruby
reloaded_process = @client.queued_process project_id, queued_process.process_id
```

It is up to you to decide how to poll API for changes (remember that larger files will take more time to be imported), but here's a simple example:

```ruby
def uploaded?(process)
  5.times do # try to check the status 5 times
    queued_process = queued_process.reload_data # load new data
    return(true) if queued_process.status == 'finished' # return true is the upload has finished
    sleep 1 # wait for 1 second, adjust this number with regards to the upload size
  end

  false # if all 5 checks failed, return false (probably something is wrong)
end

queued_process = @client.upload_file project_id,
                                     data: 'Base-64 encoded data... ZnI6DQogI...',
                                     filename: 'my_file.yml',
                                     lang_iso: 'en'
uploaded? queued_process
```
