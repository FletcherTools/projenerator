"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = require("../../program");
exports.default = program_1.program
    .command('make')
    .description('Generates a specific type of boilerplate code')
    .argument('<scope>', 'Scope')
    .argument('<blockname>', 'Block name')
    .option('--plural', 'Block plural name')
    .option('--variant', 'Variant modifier')
    .action((value, options) => {
    console.log('action:', value, options);
});
