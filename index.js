'use strict';

var plugin = require('./plugin');

function encode_url(url) {
  const parts = url.split('#').map(function (s) { return s.replace(/ /g, '-'); });

  return encodeURIComponent(parts[0]) + (parts[1] ? ('#' + parts[1]) : '');

}

module.exports = function (opts) {
  return plugin(
    // regexp to match
    // /\[\[([\|\-+\#a-zA-Z0-9_ 一-龠ぁ-ゔァ-ヴー]+)\]\]/,
    new RegExp('\\[\\[([\\|+0-9_# \\p{L}-]+)\\]\\]', 'giu'),
    // new RegExp('\[\[([\|+_ \p{L}#\p{N}-]+)\]\]', 'giu'),

    // this function will be called when something matches
    function (match, utils) {
      var text = match[1];
      var caption, url;

      // do we have a label?
      if (text.indexOf('|') !== -1) {
        caption = utils.escape(text.split('|')[0]);
        url = opts.prefix + encode_url(text.split('|')[1]);
      } else {
        url = opts.prefix + encode_url(text);
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
