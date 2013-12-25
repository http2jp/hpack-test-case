# hpack-test-case

## Draft

http://tools.ietf.org/html/draft-ietf-httpbis-header-compression


## How to use

each json has

- draft:   draft version number of implementation.
- context: "request" or "response".
- description: about encode strategy or so.
- cases:   test cases.
  - header_table_size : current header table size.
  - wire:    encoded wire data in hex string.
  - header:  decoded http header in hash.

test your encoder/decoder using cases and wire.

```js
{
  "draft": 5,
  "context": "request",
  "description": "Encoded request headers with Literal without index only."
  "cases": [
    {
      "header_table_size": 4096,
      "wire": "1234567890abcdef",
      "headers": [
        { ":method", "GET" },
        { ":scheme", "http" },
        { ":authority", "example.com" },
        { ":path", "/" },
        { "x-my-header", "value1,value2" },
      ]
    },
    .....
  ]
}
```

## File Name

each json in case-#{n}.json are individual case. each wire dosen't share context.
its describes single request/response.

each json in story-#{n}.json are story case. each wire shares context.
its describes continuous request/response.


## Contributor

- jxck
- summerwind
- kazu-yamamoto
- tatsuhiro-t


## License

The MIT License (MIT)
Copyright (c) 2013 Jxck
