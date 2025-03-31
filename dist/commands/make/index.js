"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = require("../../program");
const command_1 = require("./command");
exports.default = program_1.program
    .command('make')
    .description('Generates a specific type of boilerplate code')
    .argument('<entity-type>', 'Entity type')
    .argument('<entity-name>', 'Entity name')
    .option('-p, --plural <plural>', 'Entity plural name')
    .option('-v, --variant <variant>', 'Variant modifier')
    .option('-s, --scope <scope>', 'Scope modifier')
    .action((type, name, options) => {
    (0, command_1.makeCommand)(type, name, options);
});
