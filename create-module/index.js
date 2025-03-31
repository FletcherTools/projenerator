const path = require('path');
const fs = require('fs');
const glob = require("glob");
const Handlebars = require('handlebars');
const BASE_PATH = path.resolve('./src');

module.exports = {
  createModule
};

///

function createModule(moduleName, pluralModuleName = `${moduleName}s`) {
  const MODULE_TEMPLATES_PATH = `${process.env.TEMPLATES_DIR}/module`;
  const templateCtx = {
    moduleName: moduleName.replace(/\//g, '-'),
    pluralModuleName: pluralModuleName.replace(/\//g, '-')
  };

  const templates = glob.sync(`*`, { cwd: MODULE_TEMPLATES_PATH, matchBase: true });
  console.log(templates);

  for (let rawFileName of templates) {
    const nameTemplate = Handlebars.compile(rawFileName);
    const fileName = nameTemplate(templateCtx).replace('.hbs', '');

    const originTemplatePath = `${MODULE_TEMPLATES_PATH}/${rawFileName}`;
    const targetTemplatePath = `${BASE_PATH}/${fileName}`;

    if (fs.existsSync(targetTemplatePath)) continue;
    if (!originTemplatePath.includes('.')) {
      fs.mkdirSync(targetTemplatePath, 744);
      continue;
    }

    const template = require(originTemplatePath);
    fs.writeFileSync(targetTemplatePath, template(templateCtx), "utf-8");
  }
}
