const cli = require('caporal');
const { createBlock } = require('./create-module/index.js');

module.exports = {
  create: cli.command('type', 'Create').alias('c')
    .argument('<type>', 'Block type')
    .argument('<block-name>', 'Name of a block')
    .argument('<plural-name>', 'Plural name of a block')
    .action(function (args, options, logger) {
      return createBlock(args.blockType, args.blockName, args.pluralName);
    }),
  test: cli.command('test', 'Test').alias('c')
    .action(function (args, options, logger) {
      const Handlebars = require('handlebars');
      console.log(Handlebars.compile('{{capital name}}')({ name: 'very-deep-module' }));
      return null;
    })
};
