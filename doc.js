"use strict";

const Context = require(`./src/class/Context`);
const Uri = require(`./src/class/Uri`);
const WritableProperty = require(`./src/class/WritableProperty`);
const IdProperty = require(`./src/class/IdProperty`);
const ModelList = require(`./src/class/ModelList`);
const Model = require(`./src/class/Model`);

const models = require(`./src/def/models`);

models.forEach(model => {

  let modelName = model.id;

  let hasParentModel = null !== model.parentId;
  if (hasParentModel) {
    modelName = model.parentId + '_' + modelName;
  }

  console.log(`## ${modelName}`);
  if (hasParentModel) {
    console.log(`#### ${modelName} Model Scope`);
    console.log(`\`//${model.getParent().getUriFormat()}\``);
  }
  // console.log(`#### ${modelName} Model Uri format`);
  // console.log(`\`//${model.getUriFormat()}\``);
  // console.log(`### ${modelName} Contents`);
  console.log(`|Command|Method|Uri|`);
  console.log(`|--|--|--|`);

  // GET /things
  // POST /things
  meow(model);

  model.subModels.forEach(subModel => {

    // GET /thing/:thingId/thangs
    // POST /thing/:thingId/thangs
    meow(subModel, `/${model.uriSingularName}/:${model.uriIdName}`);

  });

  // console.log(`### ${modelName} Commands`);
  //
  // model.subModels.forEach(subModel => {
  //
  //   // GET /thing/:thingId/thangs
  //   // POST /thing/:thingId/thangs
  //   meow2(subModel, `/${model.uriSingularName}/:${model.uriIdName}`);
  //
  // });

});

function meow (model, uriPrefix = '', n = 0) {

  let context = new Context(`${uriPrefix}/`);

  let pluralUri = new Uri(`${uriPrefix}/${model.uriPluralName}`);
  let singularUri = new Uri(`${uriPrefix}/${model.uriSingularName}/:${model.uriIdName}`);

  let cmdId = model.id.toLowerCase();

  let hasParentModel = null !== model.parentId;
  if (hasParentModel && uriPrefix) {
    cmdId = model.parentId.toLowerCase() + '_' + cmdId;
  }

  c(`|[get_${cmdId}_list](#get_${cmdId}_list)|\`GET\`|\`${pluralUri}\`|`);
  c(`|[create_${cmdId}](#create_${cmdId})|\`POST\`|\`${pluralUri}\`|`);
  c(`|[get_${cmdId}](#get_${cmdId})|\`GET\`|\`${singularUri}\`|`);
  c(`|[delete_${cmdId}](#delete_${cmdId})|\`DELETE\`|\`${singularUri}\`|`);

  if (hasParentModel && uriPrefix) {
    return;
  }

  model.properties.forEach(property => {

    if (property instanceof IdProperty) {
      return;
    }

    let propertyUri = new Uri(`${singularUri.str}/${property.name}`);
    let cmd = `set_${model.id.toLowerCase()}_${property}`;

    c(`|[${cmd}](#${cmd})|\`PUT\`|\`${propertyUri}\`|`);

  });

  function c () {
    console.log(...arguments);
  }

}

function meow2 (model, uriPrefix = '') {

  let context = new Context(`${uriPrefix}/`);

  let pluralUri = new Uri(`${uriPrefix}/${model.uriPluralName}`);
  let singularUri = new Uri(`${uriPrefix}/${model.uriSingularName}/:${model.uriIdName}`);

  let cmdId = model.id.toLowerCase();

  let authKey = (Date.now()*2)+'//'+Date.now();

  let hasParentModel = null !== model.parentId;
  if (hasParentModel && uriPrefix) {
    cmdId = model.parentId.toLowerCase() + '_' + cmdId;
  }

  c(`#### get_${cmdId}_list`);
  c(`**Request Format**`);
  c(`\`\`\``);
  c(`GET ${pluralUri}`);
  c(`Authorization: {app_id}/{env_id}/{authorization_key}`);
  c(`\`\`\``);

  c(`#### create_${cmdId}`);
  c(`**Request Format**`);
  c(`\`\`\``);
  c(`POST ${pluralUri}`);
  c(`Authorization: {app_id}/{env_id}/{authorization_key}`);
  c(`Content-Type: application/json;charset=utf-8`);
  c(``);
  c(`{}`)
  c(`\`\`\``);

  c(`#### get_${cmdId}`);
  c(`**Request Format**`);
  c(`\`\`\``);
  c(`GET ${singularUri}`);
  c(`Authorization: {app_id}/{env_id}/{authorization_key}`);
  c(`\`\`\``);

  c(`#### delete_${cmdId}`);
  c(`**Request Format**`);
  c(`\`\`\``);
  c(`DELETE ${singularUri}`);
  c(`Authorization: {app_id}/{env_id}/{authorization_key}`);
  c(`\`\`\``);

  if (hasParentModel && uriPrefix) {
    return;
  }

  model.properties.forEach(property => {

    if (property instanceof IdProperty) {
      return;
    }

    let propertyUri = new Uri(`${singularUri.str}/${property.name}`);
    let cmd = `set_${model.id.toLowerCase()}_${property}`;

    c(`#### ${cmd}`);
    c(`**Request Format**`);
    c(`\`\`\``);
    c(`PUT ${propertyUri}`);
    c(`Authorization: {app_id}/{env_id}/{authorization_key}`);
    c(`Content-Type: application/json;charset=utf-8`);
    c(``);
    c(`${property.exampleSetBody}`)
    c(`\`\`\``);

  });

  function c () {
    console.log(...arguments);
  }

}
