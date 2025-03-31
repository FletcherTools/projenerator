import * as Handlebars from 'handlebars';

Handlebars.registerHelper('lower', function (str) {
  return normalizeString(str);
})

Handlebars.registerHelper('upper', function (str) {
  const normalized = normalizeString(str);
  return normalized.toUpperCase();
})

Handlebars.registerHelper('capital', function (str) {
  const normalized = normalizeString(str);
  return normalized.replace(/^./, normalized?.[0]?.toUpperCase());
})

Handlebars.registerHelper('snake', function (str) {
  return str?.replace(/-/g, '_');
})

///

function normalizeString(str: string) {
  return str?.replace(/\-\w/g, chr => chr[1].toUpperCase()) ?? '';
}

