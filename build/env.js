"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.secrets = exports.isLocal = exports.isDevelopment = exports.isProduction = exports.isTesting = exports.version = exports.rootPath = void 0;
var path = __importStar(require("path"));
var _a = process.env, NODE_ENV = _a.NODE_ENV, AQUILA_LOCAL = _a.AQUILA_LOCAL;
var isBuiltCode = __dirname.includes("build");
exports.rootPath = path.join(__dirname, "..", isBuiltCode ? ".." : "");
// Version
// eslint-disable-next-line @typescript-eslint/no-var-requires
var pjsonVersion = require(path.join(exports.rootPath, "/mercury/package.json")).version;
exports.version = pjsonVersion;
// Env
exports.isTesting = NODE_ENV === "test";
exports.isProduction = NODE_ENV === "production";
exports.isDevelopment = NODE_ENV === "development";
exports.isLocal = !!AQUILA_LOCAL && NODE_ENV !== "test";
// Credentials
// eslint-disable-next-line @typescript-eslint/no-var-requires
var prodCred = require("../credentials/smartsubmittals.json");
// Firebase
var credentials = {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyBnHhFmE39eyyXEN4l8FUZ5d55hvAmEMJ8",
    credential: prodCred,
    databaseURL: "https://smartsubmittals.firebaseio.com/",
};
console.info("Using production DB...");
exports.secrets = {
    firebaseCredentials: credentials,
};
