#!/usr/bin/env node

var fs   = require('fs'),
    path = require('path'),
    url  = require('url');

var hpack = require('../../../node-http2-hpack/lib/hpack');
var ctx = hpack.createRequestContext();

if (process.argv.length < 3) {
  console.log('Usage: har2case <HAR file>');
  process.exit(0);
}

var har_path = path.resolve(process.argv[2]);
var har_file = fs.readFileSync(har_path);
var har = JSON.parse(har_file);

var cases = [];
for(var i=0; i<10; i++) {
  entry = har.log.entries[i];
  var parsed_url = url.parse(entry.request.url);

  var headers = {
    ":method": entry.request.method,
    ":scheme": parsed_url.protocol.replace(':', ''),
    ":host":   parsed_url.hostname,
    ":path":   parsed_url.pathname
  };

  entry.request.headers.forEach(function(header){
    if (header.name == 'Host') {
      return;
    }
    headers[header.name.toLowerCase()] = header.value
  });

  var buffer = ctx.compress(headers);

  var c = {
    context: "request",
    wire:    buffer.toString('base64'),
    header:  headers
  }

  cases.push(c);
}

console.log(JSON.stringify(cases, null, '  '));
