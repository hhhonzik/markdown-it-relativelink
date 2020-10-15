'use strict';

var plugin = require('markdown-it-regexp');


module.exports = function (opts) {
  return plugin(
    // regexp to match
    // /\[\[([\|\-+\#a-zA-Z0-9_ 一-龠ぁ-ゔァ-ヴー]+)\]\]/,
    /\[\[([\|\-+\#a-zA-Z0-9_ 一-龠가-힣ぁ-ゔァ-ヴー]+)\]\]/,

    // this function will be called when something matches
    function(match, utils) {
      var text = match[1];
      var caption, url;

      // do we have a label?
      if (text.indexOf('|') !== -1) {
        caption = utils.escape(text.split('|')[0]);
        url = opts.prefix + text.split('|')[1].replace(' ', '-');
      } else {
        url = opts.prefix + text.replace(' ', '-');
        caption = utils.escape(match[1]);
      }
      // URL#anchor -> URL in caption
      if (caption.indexOf('#') !== -1) {
        caption = caption.slice(0, caption.indexOf('#'));
      }

      return '<a href="' + utils.escape(url) + '">'
           + caption
           + '</a>';
    }
  );
};
