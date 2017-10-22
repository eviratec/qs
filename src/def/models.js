"use strict";

const ModelList = require(`../class/ModelList`);
const Model = require(`../class/Model`);
const IdProperty = require(`../class/IdProperty`);
const WritableProperty = require(`../class/WritableProperty`);

const ORG_MODEL = 'ORG';
const APP_MODEL = 'APP';
const ENV_MODEL = 'ENV';
const O2P_MODEL = 'O2PROVIDER';
const O2L_MODEL = 'O2LOGIN';
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
    id:               O2P_MODEL,
    parentId:         ENV_MODEL,

    uriSingularName:  'o2provider',
    uriPluralName:    'o2providers',
    uriIdName:        'o2provider_id',

    properties: [
      new IdProperty('app_id'),
      new IdProperty('env_id'),
      new WritableProperty('client_id', '"3TcHGmBWMd62ADY9ZSf8EY/TQAm3L/2DkLDH8DgDrVg="'),
      new WritableProperty('client_secret', '"QhADX78wxPUEyivWGspAcBCJ+Ak1K+fFN+nCrFYPTpA8/gjg9okVNkPNCfomw8yyWNQMHAejB18eyYRqwNWTQg=="'),
      new WritableProperty('authz_url', '"https://api.localhsot/authorize"'),
      new WritableProperty('access_token_url', '"https://api.localhost/token"'),
      new WritableProperty('enabled', 'true')
    ],
  });

  models.register({
    id:               O2L_MODEL,
    parentId:         O2P_MODEL,

    uriSingularName:  'o2login',
    uriPluralName:    'o2logins',
    uriIdName:        'o2login_id',

    properties: [
      new IdProperty('app_id'),
      new IdProperty('env_id'),
      new IdProperty('user_id'),
      new IdProperty('o2provider_id'),
      new WritableProperty('access_token', '"6AUppHObLuqBNSU9iaoWSSwMFjoh39x53DAYaTE60O9dzeoDTcN54YFsJEa3QZ9CSw6cenkEH7hyfy8ZEwVEXQ=="'),
      new WritableProperty('token_type', '"bearer"'),
      new WritableProperty('expires_in', '3600'),
      new WritableProperty('scopes', '[]'),
      new WritableProperty('foreign_id', '12345567876543312')
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
