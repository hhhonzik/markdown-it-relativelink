'use strict';


var path     = require('path');
var generate = require('markdown-it-testgen');

/*eslint-env mocha*/

describe('markdown-it-relativelink', function () {
  var md = require('markdown-it')()
              .use(require('../')({
                prefix: 'http://myprefix.com/'
              }));
  generate(path.join(__dirname, 'fixtures/ins.txt'), md);
});
