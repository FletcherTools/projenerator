import { program } from '../../program';

export default program
  .command('make')
  .description('Generates a specific type of boilerplate code')
  .argument('<scope>', 'Scope')
  .argument('<blockname>', 'Block name')
  .option('--plural', 'Block plural name')
  .option('--variant', 'Variant modifier')
  .action((value, options) => {
    console.log('action:', value, options);
  });