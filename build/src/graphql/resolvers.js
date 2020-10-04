"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Queries
var AllProjects_1 = require("../graphql/queries/AllProjects");
var Project_1 = require("../graphql/queries/Project");
// Mutations
var AddProject_1 = require("../graphql/mutations/AddProject");
// Types
var AddProjectReponse_1 = require("../graphql/types/AddProjectReponse");
var resolvers = {
    Query: {
        AllProjects: AllProjects_1.AllProjects,
        Project: Project_1.Project,
    },
    Mutation: {
        AddProject: AddProject_1.AddProject,
    },
    AddProjectResponse: AddProjectReponse_1.AddProjectResponse,
};
exports.default = resolvers;
