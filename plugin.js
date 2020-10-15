'use strict';
/*!
 * markdown-it-regexp
 * Copyright (c) 2014 Alex Kocharin
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var util = require('util');
var helpers = {};

helpers.escape = function(html) {
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};


/**
 * Counter for multi usage.
 */
var counter = 0;

/**
 * Constructor function
 */

function Plugin(regexp, replacer) {
  // return value should be a callable function
  // with strictly defined options passed by markdown-it
  var that = function (md, options) {
    that.options = options;
    that.init(md);
  };

  // initialize plugin object
  that.__proto__ = Plugin.prototype;

  // clone regexp with all the flags
  var flags = (regexp.global ? 'g' : '')
    + (regexp.multiline ? 'm' : '')
    + (regexp.ignoreCase ? 'i' : '')
    + (regexp.unicode ? 'u' : '');

  that.regexp = RegExp('^' + regexp.source, flags);

  // copy init options
  that.replacer = replacer;

  // this plugin can be inserted multiple times,
  // so we're generating unique name for it
  that.id = 'regexp-' + counter;
  counter++;

  return that;
}

util.inherits(Plugin, Function);

// function that registers plugin with markdown-it
Plugin.prototype.init = function (md) {
  md.inline.ruler.push(this.id, this.parse.bind(this));

  md.renderer.rules[this.id] = this.render.bind(this);
};

Plugin.prototype.parse = function (state, silent) {
  // slowwww... maybe use an advanced regexp engine for this
  var match = this.regexp.exec(state.src.slice(state.pos));
  if (!match) {
    return false;
  }

  // valid match found, now we need to advance cursor
  state.pos += match[0].length;

  // don't insert any tokens in silent mode
  if (silent) {
    return true;
  }

  var token = state.push(this.id, '', 0);
  token.meta = { match: match };

  return true;
};

Plugin.prototype.render = function (tokens, id) {
  return this.replacer(tokens[id].meta.match, helpers);
};


/**
 * Expose `Plugin`
 */
module.exports = Plugin;
