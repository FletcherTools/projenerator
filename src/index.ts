import path from 'path';
import { accessSync, constants } from 'node:fs';

import './handlebars.helpers';
import './commands';
import { program } from './program';

///

const BASE_PATH = path.resolve('./');
const CONFIG_DIR_PATH = path.join(BASE_PATH, '.projenerator');
const CONFIG_FILE_PATH = path.join(CONFIG_DIR_PATH, 'config.json');

// console.warn('BASE_PATH', BASE_PATH);
// console.warn('CONFIG_DIR_PATH', CONFIG_DIR_PATH);
// console.warn('CONFIG_FILE_PATH', CONFIG_FILE_PATH);

try {
  accessSync(CONFIG_FILE_PATH, constants.R_OK);
  const rawConfig = require(CONFIG_FILE_PATH);

  globalThis.config = {
    templatesDir: path.join(CONFIG_DIR_PATH, rawConfig.templatesDir ?? './templates'),
    targetDir: path.join(CONFIG_DIR_PATH, rawConfig.targetDir ?? './'),
  };

} catch (e) {
  console.error('Failed to load config. Check if .projenerator directory exists and contains config.json', e);
}

///

program.parse(process.argv);
