import fs from 'fs';
import * as Handlebars from 'handlebars';
import * as glob from 'glob';

export class MakeCommandOptions {
  scope?: string;
  variant?: string;
  plural?: string;
}

export function makeCommand(entityType: string, entityName: string, options: MakeCommandOptions) {
  // console.warn('command:make', entityType, entityName, options, globalThis.config);
  const config = globalThis.config;

  const entityNamePlural = options.plural ?? `${entityName}s`;
  const templateCtx = {
    entityName,
    entityNamePlural
  };

  const variantModifier = options.variant ? `:${options.variant}` : '';
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

    if (fs.existsSync(targetPath)) continue;
    if (fs.lstatSync(originTemplatePath).isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      continue;
    }

    const template = require(originTemplatePath);
    fs.writeFileSync(targetPath, template(templateCtx), "utf-8");
    createdFiles.push(targetPath);
  }

  console.log('created', createdFiles);
}