"use strict";

module.exports = class Model {
  constructor (list, o) {
    o = o || {};

    // Uri Plural Name
    // e.g. 'things'
    this.id = o.id;

    // Uri Plural Name
    // e.g. 'things'
    this.parentId = o.parentId || null;

    // Uri Plural Name
    // e.g. 'things'
    this.uriPluralName = o.uriPluralName;

    // Uri Singular Name
    // e.g. 'thing'
    this.uriSingularName = o.uriSingularName;

    // Uri Id Name
    // e.g. 'thing_id'
    this.uriIdName = o.uriIdName;

    this.list = list;

    this.properties = [];

    importModelProperties(this, o);
  }

  get subModels () {
    return this.list.allWithParentId(this.id);
  }

  get context () {
    return '/' + ( this.hasParent && this.getParent().getUriFormat() || '' );
  }

  get hasParent () {
    return null !== this.parentId;
  }

  getParent () {
    return this.hasParent &&
      this.list.byId(this.parentId);
  }

  getUriFormat () {
    let uriFormatParts = [];

    let parent = this;
    while (parent) {
      let p = parent;
      parent = p.getParent();
      uriFormatParts.unshift(`${p.uriSingularName}/{${p.uriIdName}}`);
    }

    return uriFormatParts.join(`/`);
  }

  getList (context) {
    return Query(context.str).list(this.id);
  }

  createOne (context, attrs) {
    // user/1234
    return x.exec(`create:${this.id}`, context);
  }

  getOne (context, targetId) {
    // user/1234
    return x.query(`${this.id}/${targetId}`);
  }

  deleteOne (context, targetId) {
    // delete:user/1234
    return x.exec(`delete:${this.id}/${targetId}`, context);
  }

  changeProperty (targetId, property, newValue) {
    // set:user/1234:email_address
    return x.exec(`set:${this.id}/${targetId}:${property}`, newValue);
  }
}

function importModelProperties (model, o) {
  let validProperties;
  let propertiesAreDefined = 'properties' in o;
  if (!propertiesAreDefined) {
    return;
  }

  validProperties = Array.isArray(o.properties);
  if (!validProperties) {
    return;
  }

  o.properties.forEach(property => {
    model.properties.push(property);
  });
}
