# hpack-test-case

## Draft

http://tools.ietf.org/html/draft-ietf-httpbis-header-compression


## How to use

each json has

- draft:   draft version number of implementation.
- header_table_size : current header table size.
- context: the case is request header or response header.
- cases:   test cases.
- wire:    encoded wire data in base64.
- header:  decoded http header in array.


```js
{
  "draft": 5,
  "header_table_size": 4096,
  "context": "request",
  "cases": [
    {
      "wire": "gocDiPRGbWkS0nF3hw==",
      "headers": [
        [ ":method", "GET" ],
        [ ":scheme", "http" ],
        [ ":authority", "yahoo.co.jp" ],
        [ ":path", "/" ]
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
