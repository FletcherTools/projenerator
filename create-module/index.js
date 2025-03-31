const path = require('path');
const fs = require('fs');
const glob = require("glob");
const Handlebars = require('handlebars');
const BASE_PATH = path.resolve('./src');

module.exports = {
  createBlock
};

///

function createBlock(blockType, blockName, pluralBlockName = `${blockName}s`) {
  const BLOCK_TEMPLATES_PATH = `${process.env.TEMPLATES_DIR}/${blockName}`;

  const templateCtx = {
    blockName: blockName.replace(/\//g, '-'),
    pluralBlockName: pluralBlockName.replace(/\//g, '-')
  };

  const templates = glob.sync(`*`, { cwd: BLOCK_TEMPLATES_PATH, matchBase: true });
  console.log(templates);

  for (let rawFileName of templates) {
    const nameTemplate = Handlebars.compile(rawFileName);
    const fileName = nameTemplate(templateCtx).replace('.hbs', '');

    const originTemplatePath = `${BLOCK_TEMPLATES_PATH}/${rawFileName}`;
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
