import { program } from '../../program';
import { makeCommand } from './command';

export default program
  .command('make')
  .description('Generates a specific type of boilerplate code')
  .argument('<entity-type>', 'Entity type')
  .argument('<entity-name>', 'Entity name')
  .option('-p, --plural <plural>', 'Entity plural name')
  .option('-v, --variant <variant>', 'Variant modifier')
  .option('-s, --scope <scope>', 'Scope modifier')
  .action((type, name, options) => {
    makeCommand(type, name, options);
  });