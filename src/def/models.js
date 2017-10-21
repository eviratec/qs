"use strict";

const ModelList = require(`../class/ModelList`);
const Model = require(`../class/Model`);
const IdProperty = require(`../class/IdProperty`);
const WritableProperty = require(`../class/WritableProperty`);

const ORG_MODEL = 'ORG';
const APP_MODEL = 'APP';
const ENV_MODEL = 'ENV';
const USER_MODEL = 'USER';
const MEMBER_MODEL = 'MEMBER';

let models = new ModelList();

registerModels(models);

module.exports = models;

function registerModels (models) {

  models.register({
    id:               ORG_MODEL,

    uriSingularName:  'org',
    uriPluralName:    'orgs',
    uriIdName:        'org_id',

    properties: [
      new WritableProperty('name'),
      new WritableProperty('title')
    ],
  });

  models.register({
    id:               APP_MODEL,
    parentId:         ORG_MODEL,

    uriSingularName:  'app',
    uriPluralName:    'apps',
    uriIdName:        'app_id',

    properties: [
      new IdProperty('org_id'),
      new WritableProperty('name', '"my_app"'),
      new WritableProperty('title', '"My App"')
    ],
  });

  models.register({
    id:               MEMBER_MODEL,
    parentId:         ORG_MODEL,

    uriSingularName:  'member',
    uriPluralName:    'members',
    uriIdName:        'member_id',

    properties: [
      new IdProperty('org_id'),
      new WritableProperty('email_address', '"user@domain.tld"'),
      new WritableProperty('display_name', '"John Smith"'),
      new WritableProperty('password', '"abc$123"'),
    ],
  });

  models.register({
    id:               ENV_MODEL,
    parentId:         APP_MODEL,

    uriSingularName:  'env',
    uriPluralName:    'envs',
    uriIdName:        'env_id',

    properties: [
      new IdProperty('app_id'),
      new WritableProperty('name', '"production"'),
      new WritableProperty('title', '"Production Environment"')
    ],
  });

  models.register({
    id:               USER_MODEL,
    parentId:         ENV_MODEL,

    uriSingularName:  'user',
    uriPluralName:    'users',
    uriIdName:        'user_id',

    properties: [
      new IdProperty('env_id'),
      new WritableProperty('email_address', '"user@domain.tld"'),
      new WritableProperty('display_name', '"John Smith"'),
      new WritableProperty('password', '"abc$123"'),
    ],
  });

}
