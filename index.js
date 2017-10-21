"use strict";

const Context = require(`./src/class/Context`);
const Uri = require(`./src/class/Uri`);
const WritableProperty = require(`./src/class/WritableProperty`);
const IdProperty = require(`./src/class/IdProperty`);
const ModelList = require(`./src/class/ModelList`);
const Model = require(`./src/class/Model`);

const models = require(`./src/def/models`);

const express = require(`express`);
const app = express();

const bodyParser = require(`body-parser`);
const multer = require(`multer`); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const apiRef = (function () {
  class CommandReference {
    constructor (cmd, httpMethod, httpUri) {
      this.cmd = cmd;
      this.httpMethod = httpMethod;
      this.httpUri = httpUri;
    }
  }
  class ApiReference {
    constructor () {
      this.commands = [];
    }
    define (cmd, httpMethod, httpUri) {
      let definition = new CommandReference(cmd, httpMethod, httpUri);
      this.commands.push(definition);
      console.log(definition);
    }
  }
  return new ApiReference();
})();

models.forEach(model => {

  let pluralUri = new Uri(`/${model.uriPluralName}`);
  let singularUri = new Uri(`/${model.uriSingularName}/:${model.uriIdName}`);

  let cmdId = model.id.toLowerCase();

  let hasParentModel = null !== model.parentId;
  if (hasParentModel) {
    cmdId = model.parentId.toLowerCase() + '_' + cmdId;
  }

  apiRef.define(`get_${cmdId}_list`, `get`, pluralUri);
  app.get(pluralUri, (req, res, next) => {
    res.send(200, $cmd(req, { command: `get_${cmdId}_list` }));
  });

  apiRef.define(`create_${cmdId}`, `post`, pluralUri);
  app.post(pluralUri, (req, res, next) => {
    res.send(200, $cmd(req, { command: `create_${cmdId}` }));
  });

  apiRef.define(`get_${cmdId}`, `get`, singularUri);
  app.get(singularUri, (req, res, next) => {
    res.send(200, $cmd(req, { command: `get_${cmdId}` }));
  });

  apiRef.define(`delete_${cmdId}`, `delete`, singularUri);
  app.delete(singularUri, (req, res, next) => {
    res.send(200, $cmd(req, { command: `delete_${cmdId}` }));
  });

  model.subModels.forEach(subModel => {

    let _cmdId = subModel.parentId.toLowerCase() + '_' + subModel.id.toLowerCase();


    {
      let _uri = `${singularUri}/${subModel.uriPluralName}`;
      let _cmd = `get_${_cmdId}_list`;

      apiRef.define(_cmd, `get`, _uri);

      app.get(_uri, (req, res, next) => {
        res.send(200, $cmd(req, { command: _cmd }));
      });
    }

    {
      let _uri = `${singularUri}/${subModel.uriPluralName}`;
      let _cmd = `create_${_cmdId}`;

      apiRef.define(_cmd, `post`, _uri);

      app.post(_uri, (req, res, next) => {
        res.send(200, $cmd(req, { command: _cmd }));
      });
    }

  });

  model.properties.forEach(property => {

    /**
     * ## Example request
     *
     * ```
     * curl -X PUT "http://localhost:8080/user/123/email_address" -w "\n" -v
     *   -H "Authorization: foobars"
     *   -H "Content-Type: application/json;charset=utf-8"
     *   --data "[\"Foo@bars.com\"]"
     * ```
     */

    if (property instanceof IdProperty) {
      return;
    }

    let propertyUri = new Uri(`${singularUri.str}/${property.name}`);
    let cmd = `set_${model.id.toLowerCase()}_${property}`;

    apiRef.define(cmd, `put`, propertyUri);

    app.put(propertyUri, (req, res, next) => {
      res.send(200, $cmd(req, { command: cmd, newValue: req.body }));
    });

  });

});

app.listen(8080, function () {
  console.log("open");
});

function $cmd (req, opts) {
  opts = opts || {};
  opts.auth = req.headers.authorization || '';
  opts.uri = req.path;
  return opts;
}
