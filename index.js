const fs = require('fs');
const path = require('path');
const caporal = require('caporal');

require('./commands.js');
require('./handlebars.helpers.js');

const configPath = `${process.env.PWD}/projenerator/config.json`;
fs.access(configPath, fs.F_OK, (err) => {

  if (err) {
    console.error('You must include projenerator folder with config.json in your project\'s root.');
    return;
  }

  const config = require(configPath);
  const TEMPLATES_DIR = path.resolve(process.env.PWD, 'projenerator', config.templatesDir)
    || `${process.env.PWD}/projenerator/templates`;

  process.env.TEMPLATES_DIR = TEMPLATES_DIR;
  globalThis.config = config;

  ///

  console.log(process.argv)
  caporal.version('1.0.0').parse(process.argv);
})
