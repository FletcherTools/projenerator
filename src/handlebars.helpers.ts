import * as Handlebars from 'handlebars';

Handlebars.registerHelper('upper', toUpperCase);
Handlebars.registerHelper('capital', toPascalCase);
Handlebars.registerHelper('pascal', toPascalCase);
Handlebars.registerHelper('camel', toCamelCase);
Handlebars.registerHelper('kebab', toKebabCase);
Handlebars.registerHelper('snake', toSnakeCase);

///

function toUpperCase(value: string): string {
  return value?.toUpperCase();
}

// camelCase
function toCamelCase(value: string): string {
  const normalized = normalizeString(value);
  return normalized.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
}

// PascalCase
function toPascalCase(value: string): string {
  const normalized = normalizeString(value);
  return normalized.replace(/(?:^|-)(\w)/g, (_, letter) => letter?.toUpperCase());
}

// snake_case
function toSnakeCase(value: string): string {
  return value?.replace(/-/g, '_');
}

// kebab-case
function toKebabCase(value: string): string {
  return normalizeString(value);
}

///

function normalizeString(str: string) {
  if (!str) return '';
  return str
    .replace(/([^^])([A-Z])/g, (_, g1, g2) => `${g1}-${g2}`)
    .replace(/[_\-\s]+/g, '-')
    .toLowerCase();
}

