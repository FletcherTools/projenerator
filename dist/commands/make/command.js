"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeCommandOptions = void 0;
exports.makeCommand = makeCommand;
const fs_1 = __importDefault(require("fs"));
const Handlebars = __importStar(require("handlebars"));
const glob = __importStar(require("glob"));
class MakeCommandOptions {
}
exports.MakeCommandOptions = MakeCommandOptions;
function makeCommand(entityType, entityName, options) {
    var _a;
    // console.warn('command:make', entityType, entityName, options, globalThis.config);
    const config = globalThis.config;
    const entityNamePlural = (_a = options.plural) !== null && _a !== void 0 ? _a : `${entityName}s`;
    const templateCtx = {
        entityName,
        entityNamePlural
    };
    const variantModifier = options.variant ? `--${options.variant}` : '';
    const templatesPath = `${config.templatesDir}/${entityType}${variantModifier}`;
    const templates = glob.sync(`*`, { cwd: templatesPath, matchBase: true });
    // console.log(entityType, templatesPath, templates);
    let createdFiles = [];
    for (let rawFileName of templates) {
        const nameTemplate = Handlebars.compile(rawFileName);
        const fileName = nameTemplate(templateCtx).replace('.hbs', '');
        const originTemplatePath = `${templatesPath}/${rawFileName}`;
        const targetPath = options.scope
            ? `${config.targetDir}/${options.scope}/${fileName}`
            : `${config.targetDir}/${fileName}`;
        if (fs_1.default.existsSync(targetPath))
            continue;
        if (fs_1.default.lstatSync(originTemplatePath).isDirectory()) {
            fs_1.default.mkdirSync(targetPath, { recursive: true });
            continue;
        }
        const template = require(originTemplatePath);
        fs_1.default.writeFileSync(targetPath, template(templateCtx), "utf-8");
        createdFiles.push(targetPath);
    }
    console.log('created', createdFiles);
}
