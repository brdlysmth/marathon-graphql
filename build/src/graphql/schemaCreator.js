"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var graphql_1 = require("graphql");
var schema = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  \"\"\"\n  Smart Submittals Queries\n  \"\"\"\n  type Query {\n    \"\"\"\n    Get all projects\n    \"\"\"\n    AllProjects: [Project!]!\n    \"\"\"\n    Get a single project\n    \"\"\"\n    Project(input: GetProjectInput!): Project!\n  }\n\n  \"\"\"\n  Smart Submittals Queries\n  \"\"\"\n  type Mutation {\n    \"\"\"\n    Get all projects\n    \"\"\"\n    AddProject(input: AddProjectInput!): AddProjectResponse\n  }\n\n  input AddProjectInput {\n    \"\"\"\n    The id of the customer to add the address to\n    \"\"\"\n    name: String!\n    number: Int!\n  }\n\n  type AddProjectResponse {\n    name: String\n  }\n\n  input GetProjectInput {\n    id: String!\n  }\n\n  type Project {\n    name: String!\n    number: Int!\n  }\n"], ["\n  \"\"\"\n  Smart Submittals Queries\n  \"\"\"\n  type Query {\n    \"\"\"\n    Get all projects\n    \"\"\"\n    AllProjects: [Project!]!\n    \"\"\"\n    Get a single project\n    \"\"\"\n    Project(input: GetProjectInput!): Project!\n  }\n\n  \"\"\"\n  Smart Submittals Queries\n  \"\"\"\n  type Mutation {\n    \"\"\"\n    Get all projects\n    \"\"\"\n    AddProject(input: AddProjectInput!): AddProjectResponse\n  }\n\n  input AddProjectInput {\n    \"\"\"\n    The id of the customer to add the address to\n    \"\"\"\n    name: String!\n    number: Int!\n  }\n\n  type AddProjectResponse {\n    name: String\n  }\n\n  input GetProjectInput {\n    id: String!\n  }\n\n  type Project {\n    name: String!\n    number: Int!\n  }\n"])));
function main() {
    var schemaString = graphql_1.print(schema);
    fs.writeFileSync("./schema.graphql", schemaString);
}
main();
var templateObject_1;
