log = console.log;
for (var i = 0; i < 22; i++) {
  i < 10 ? i = '0' + i : i;
  var file = './story_' + i + '.json';
  var cases = require(file);
  var must = ['scheme', 'host', 'path', 'method', 'status'];
  var result = cases.map(function(c) {
    var tmp = {};
    Object.keys(c.header).forEach(function(key) {
      k = key.toLowerCase();
      if (must.indexOf(k) > 0) {
        k = ':' + k;
      }
      tmp[k] = c.header[key];
    });
    c.header = tmp;
    c.wire = c.wire;
    c.context = c.context;
    return c;
  });

  var str = JSON.stringify(result, null, '  ');
  var fs = require('fs');
  fs.writeFileSync(file, str);
}
