const path = require('path');
const fs = require('fs');
const glob = require("glob");
const Handlebars = require('handlebars');
const BASE_PATH = path.resolve('./');

module.exports = {
  createBlock
};

///

function createBlock(blockType, blockName, pluralBlockName = `${blockName}s`) {
  console.log('process.env.config', process.env.config);
  console.log('createBlock', blockType, blockName, pluralBlockName);

  const config = globalThis.config;
  const BLOCK_TEMPLATES_PATH = `${process.env.TEMPLATES_DIR}/${blockType}`;
  const TARGET_PATH_BASE = path.resolve([`${BASE_PATH}`, `${config.targetBlockDirectories?.[blockType] || config.targetDir}`].join('/'));
  console.log(TARGET_PATH_BASE);

  const templateCtx = {
    blockName: blockName.replace(/\//g, '-'),
    pluralBlockName: pluralBlockName.replace(/\//g, '-')
  };

  const templates = glob.sync(`*`, { cwd: BLOCK_TEMPLATES_PATH, matchBase: true });
  console.log(templates, blockType, BLOCK_TEMPLATES_PATH);

  for (let rawFileName of templates) {
    const nameTemplate = Handlebars.compile(rawFileName);
    const fileName = nameTemplate(templateCtx).replace('.hbs', '');

    const originTemplatePath = `${BLOCK_TEMPLATES_PATH}/${rawFileName}`;
    const targetPath = `${TARGET_PATH_BASE}/${fileName}`;

    if (fs.existsSync(targetPath)) continue;
    if (!originTemplatePath.includes('.')) {
      fs.mkdirSync(targetPath, 744);
      continue;
    }

    const template = require(originTemplatePath);
    fs.writeFileSync(targetPath, template(templateCtx), "utf-8");
  }
}
