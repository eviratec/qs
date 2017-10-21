"use strict";

module.exports = class WritableProperty {
  constructor (name, exampleSetBody) {
    this.name = name;
    this.exampleSetBody = exampleSetBody;
  }
  toString () {
    return this.name;
  }
}
