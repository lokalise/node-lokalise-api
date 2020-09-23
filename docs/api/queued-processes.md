# Queued processes

[Queued processes attributes](https://app.lokalise.com/api2docs/curl/#object-queued-processes)

## Fetch queued processes

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-processes-get)

```ruby
@client.queued_processes(project_id) # Input:
                                     ## project_id (string, required)
                                     # Output:
                                     ## Collection of queued processes
```

## Fetch a single queued process

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-process-get)

```ruby
@client.queued_process(project_id, process_id) # Input:
                                               ## project_id (string, required)
                                               ## process_id (string, required)
                                               # Output:
                                               ## Queued process resource
```
