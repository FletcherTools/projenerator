const Handlebars = require('handlebars');

Handlebars.registerHelper('lower', function (str) {
  return normalizeString(str);
})

Handlebars.registerHelper('capital', function (str) {
  const normalized = normalizeString(str);
  return normalized.replace(/^./, normalized[0].toUpperCase());
})

Handlebars.registerHelper('upper', function (str) {
  const normalized = normalizeString(str);
  return normalized.toUpperCase();
})

Handlebars.registerHelper('snake', function (str) {
  return str.replace(/-/g, '_');
})

///

function normalizeString(str) {
  return str.replace(/\-\w/g, chr => chr[1].toUpperCase());
}

