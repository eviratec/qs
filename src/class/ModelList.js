"use strict";

const Model = require(`./Model`);

module.exports = class ModelList {
  constructor () {
    this.items = [];
  }
  register (model) {
    this.items.push(new Model(this, model));
    return this;
  }
  allWithParentId (needle) {
    return this.items.filter(item => {
      let isMatch = needle === item.parentId;
      return isMatch;
    });
  }
  allWithNoParentId () {
    return this.allWithParentId(null);
  }
  all () {
    return this.items.slice(0);
  }
  forEach (cb) {
    return this.items.forEach(cb);
  }
  byId (id) {
    return this.items.filter(item => {
      let isMatch = id === item.id;
      return isMatch;
    })[0];
  }
}
