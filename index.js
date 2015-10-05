'use strict';

var plugin = require('markdown-it-regexp');


module.exports = function (opts) {
  return plugin(
    // regexp to match
    /\[\[([a-zA-Z0-9_ ]+)\]\]/,

    // this function will be called when something matches
    function(match, utils) {
      var url = opts.prefix + match[1].replace(' ', '-');
      var caption = utils.escape(match[1]);

      return '<a href="' + utils.escape(url) + '">'
           + caption
           + '</a>';
    }
  );
};
