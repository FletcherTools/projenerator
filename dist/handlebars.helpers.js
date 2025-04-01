"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const Handlebars = __importStar(require("handlebars"));
Handlebars.registerHelper('upper', toUpperCase);
Handlebars.registerHelper('capital', toPascalCase);
Handlebars.registerHelper('pascal', toPascalCase);
Handlebars.registerHelper('camel', toCamelCase);
Handlebars.registerHelper('kebab', toKebabCase);
Handlebars.registerHelper('snake', toSnakeCase);
///
function toUpperCase(value) {
    return value === null || value === void 0 ? void 0 : value.toUpperCase();
}
// camelCase
function toCamelCase(value) {
    const normalized = normalizeString(value);
    return normalized.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
}
// PascalCase
function toPascalCase(value) {
    const normalized = normalizeString(value);
    return normalized.replace(/(?:^|-)(\w)/g, (_, letter) => letter === null || letter === void 0 ? void 0 : letter.toUpperCase());
}
// snake_case
function toSnakeCase(value) {
    return value === null || value === void 0 ? void 0 : value.replace(/-/g, '_');
}
// kebab-case
function toKebabCase(value) {
    return normalizeString(value);
}
///
function normalizeString(str) {
    if (!str)
        return '';
    return str
        .replace(/([^^])([A-Z])/g, (_, g1, g2) => `${g1}-${g2}`)
        .replace(/[_\-\s]+/g, '-')
        .toLowerCase();
}
