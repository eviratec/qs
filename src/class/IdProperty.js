"use strict";

module.exports = class IdProperty {
  constructor (name) {
    this.name = name;
  }
  toString () {
    return this.name;
  }
}
