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
    constructor (cmd, httpMethod, httpUri, context) {
      this.cmd = cmd;
      this.httpMethod = httpMethod;
      this.httpUri = httpUri;
      this.context = context;
      this.idTypes = idTypesFor(this);
    }
    toJSON () {
      return {
        cmd: cmd,
        httpMethod: httpMethod,
        httpUri: httpUri,
        context: context,
        idTypes: idTypes
      }
    }
  }
  function idTypesFor (commandReference) {
    return commandReference.context.split(`/`).filter(idType => {
      let isIdTypeName = `{` === idType[0];
      return isIdTypeName;
    }).map(idTypeName => {
      return idTypeName.substr(1, idTypeName.length-2)
    });
  }
  class ApiReference {
    constructor () {
      this.commands = [];
    }
    define (cmd, httpMethod, httpUri, context) {
      let definition = new CommandReference(cmd, httpMethod, httpUri, context);
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

  apiRef.define(`get_${cmdId}_list`, `get`, pluralUri, model.context);
  app.get(pluralUri, (req, res, next) => {
    let d = $cmd(req, { command: `get_${cmdId}_list` });
    res.send(200, d);
  });

  apiRef.define(`create_${cmdId}`, `post`, pluralUri, model.context);
  app.post(pluralUri, (req, res, next) => {
    let d = $cmd(req, { command: `create_${cmdId}`, newModel: req.body });
    res.send(200, d);
  });

  apiRef.define(`get_${cmdId}`, `get`, singularUri, model.context);
  app.get(singularUri, (req, res, next) => {
    let d = $cmd(req, { command: `get_${cmdId}` });
    res.send(200, d);
  });

  apiRef.define(`delete_${cmdId}`, `delete`, singularUri, model.context);
  app.delete(singularUri, (req, res, next) => {
    let d = $cmd(req, { command: `delete_${cmdId}` });
    res.send(200, d);
  });

  model.subModels.forEach(subModel => {

    let _cmdId = subModel.parentId.toLowerCase() + '_' + subModel.id.toLowerCase();


    {
      let _uri = `${singularUri}/${subModel.uriPluralName}`;
      let _cmd = `get_${_cmdId}_list`;

      apiRef.define(_cmd, `get`, _uri, model.context);

      app.get(_uri, (req, res, next) => {
        let d = $cmd(req, { command: _cmd });
        res.send(200, d);
      });
    }

    {
      let _uri = `${singularUri}/${subModel.uriPluralName}`;
      let _cmd = `create_${_cmdId}`;

      apiRef.define(_cmd, `post`, _uri, model.context);

      app.post(_uri, (req, res, next) => {
        let d = $cmd(req, { command: _cmd, newModel: req.body });
        res.send(200, d);
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

    apiRef.define(cmd, `put`, propertyUri, model.context);

    app.put(propertyUri, (req, res, next) => {
      let d = $cmd(req, { command: cmd, newValue: req.body[0] });
      res.send(200, d);
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
