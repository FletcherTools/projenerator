"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const node_fs_1 = require("node:fs");
require("./handlebars.helpers");
require("./commands");
const program_1 = require("./program");
///
const BASE_PATH = path_1.default.resolve('./');
const CONFIG_DIR_PATH = path_1.default.join(BASE_PATH, '.projenerator');
const CONFIG_FILE_PATH = path_1.default.join(CONFIG_DIR_PATH, 'config.json');
// console.warn('BASE_PATH', BASE_PATH);
// console.warn('CONFIG_DIR_PATH', CONFIG_DIR_PATH);
// console.warn('CONFIG_FILE_PATH', CONFIG_FILE_PATH);
try {
    (0, node_fs_1.accessSync)(CONFIG_FILE_PATH, node_fs_1.constants.R_OK);
    const userConfig = require(CONFIG_FILE_PATH);
    globalThis.config = {
        templatesDir: path_1.default.join(CONFIG_DIR_PATH, './templates'),
        targetDir: path_1.default.join(CONFIG_DIR_PATH, (_a = userConfig.targetDir) !== null && _a !== void 0 ? _a : './'),
    };
}
catch (e) {
    console.error('Failed to load config. Check if .projenerator directory exists and contains config.json', e);
}
///
program_1.program.parse(process.argv);
