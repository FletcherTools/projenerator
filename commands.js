const cli = require('caporal');
const { createBlock } = require('./commands/create.js');

module.exports = {
  create: cli.command('type', 'Create').alias('c')
    .argument('<type>', 'Block type')
    .argument('<block-name>', 'Name of a block')
    .option('<plural-name>', 'Plural name of a block')
    .action(function (args, opts, logger) {
      return createBlock(args.blockType, args.blockName, opts.pluralName);
    }),
  test: cli.command('test', 'Test').alias('c')
    .action(function (args, options, logger) {
      const Handlebars = require('handlebars');
      console.log(Handlebars.compile('{{capital name}}')({ name: 'very-deep-module' }));
      return null;
    })
};
