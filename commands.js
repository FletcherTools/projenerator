const cli = require('caporal');
const { createModule } = require('./create-module/index.js');

module.exports = {
  module: cli.command('module', 'Create Module').alias('c')
    .argument('<module-name>', 'Name of a module')
    .argument('<plural-name>', 'Plural name of a module')
    .action(function (args, options, logger) {
      return createModule(args.moduleName, args.pluralName);
    }),
  test: cli.command('test', 'Test').alias('c')
    .action(function (args, options, logger) {
      const Handlebars = require('handlebars');
      console.log(Handlebars.compile('{{capital name}}')({ name: 'very-deep-module' }));
      return null;
    })
};
