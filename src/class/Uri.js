"use strict";

module.exports = class Uri {
  constructor (str) {
    this.str = str;
  }
  toString () {
    return this.str;
  }
}
