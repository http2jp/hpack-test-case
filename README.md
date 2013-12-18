# hpack-test-case

## Version

HPACK draft-05

http://tools.ietf.org/html/draft-ietf-httpbis-header-compression-05

## How to use

each file has a json arry.
each json has
- context: describes the case is request header or response header
- wire: describes encoded wire data in base64
- header: describes decoded http header

input wire value to your HPACK decoder, and decoded result should has header values name/value pair.


## File Name

each json in case-#{n}.json are individual case. each wire dosen't share context.
its describes single request/response.

each json in story-#{n}.json are story case. each wire shares context.
its describes continuous request/response.


## Contributer

- jxck
- summerwind


## License

The MIT License (MIT)
Copyright (c) 2013 Jxck
