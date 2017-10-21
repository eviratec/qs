"use strict";

module.exports = class Context {
  constructor (str) {
    this.str = str;
  }
  toString () {
    return this.str;
  }
}
