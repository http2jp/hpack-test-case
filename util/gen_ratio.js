var fs   = require('fs'),
    path = require('path'),
    util = require('util');

var ignore_names = [ '.git', 'raw-data', 'util' ];
var results = {};
var stories = {};

var base_dir = path.resolve(__dirname + '/../');
var base_files = fs.readdirSync(base_dir);

var format = function(comp_len, src_len){
  var ratio = "" + Math.round(comp_len / src_len * 100) / 100;
  if (ratio.length < 4) {
    ratio += '0';
  }
  return util.format('%s (%d/%d)', ratio, comp_len, src_len);
};

base_files.forEach(function(impl_path){
  var stat = fs.statSync(base_dir + '/' + impl_path);
  if (!stat.isDirectory() || ignore_names.indexOf(impl_path) != -1) {
    return;
  }

  results[impl_path] = {};

  var comp_len_all = 0;
  var src_len_all = 0;

  var story_dir = path.resolve(base_dir + '/' + impl_path);
  var story_files = fs.readdirSync(story_dir);

  story_files.forEach(function(story_path){
    if (!story_path.match(/.json$/)) {
      return;
    }

    var comp_len = 0;
    var src_len = 0;

    var story = require(story_dir + '/' + story_path);
    story.cases.forEach(function(c){
      comp_len += c.wire.length / 2;

      c.headers.forEach(function(header){
        var key = Object.keys(header)[0];
        src_len += key.length;
        src_len += header[key].length;
      });
    });

    comp_len_all += comp_len;
    src_len_all += src_len;
    var ratio = Math.round(comp_len / src_len * 100) / 100;

    results[impl_path][story_path] = format(comp_len, src_len);
    stories[story_path] = true;
  });

  var ratio_all = Math.round(comp_len_all / src_len_all * 100) / 100;
  results[impl_path]['Overall'] = format(comp_len_all, src_len_all);
});

var info_text = '';
info_text += "The each cell has X (Y/Z) format:  \n\n";
info_text += "**X**: Y / Z  \n";
info_text += "**Y**: number of bytes after compression  \n";
info_text += "**Z**: number of bytes before compression  \n\n";
console.log(info_text);

var impl_names = Object.keys(results).sort();
var story_names = Object.keys(stories).sort();
story_names.push('Overall');

var header1 = [ 'story' ];
var header2 = [ '---' ];
impl_names.forEach(function(impl){
  header1.push(impl);
  header2.push('---');
});

console.log('|' + header1.join('|') + '|');
console.log('|' + header2.join('|') + '|');

story_names.forEach(function(story){
  var line = [ story ];

  impl_names.forEach(function(impl){
    if (story in results[impl]) {
      line.push(results[impl][story]);
    } else {
      line.push('N/A');
    }
  });

  console.log('|' + line.join('|') + '|');
});

