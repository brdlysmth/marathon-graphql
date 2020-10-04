import * as path from "path";

const { NODE_ENV, AQUILA_LOCAL } = process.env;

const isBuiltCode = __dirname.includes("build");
export const rootPath = path.join(__dirname, "..", isBuiltCode ? ".." : "");

// Version
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: pjsonVersion } = require(path.join(
  rootPath,
  "/mercury/package.json"
));
export const version = pjsonVersion;

// Env
export const isTesting = NODE_ENV === "test";
export const isProduction = NODE_ENV === "production";
export const isDevelopment = NODE_ENV === "development";
export const isLocal = !!AQUILA_LOCAL && NODE_ENV !== "test";

// Credentials
// eslint-disable-next-line @typescript-eslint/no-var-requires
const prodCred = require("../credentials/smartsubmittals.json");

// Firebase
const credentials = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  apiKey: "AIzaSyBnHhFmE39eyyXEN4l8FUZ5d55hvAmEMJ8",
  credential: prodCred,
  databaseURL: "https://smartsubmittals.firebaseio.com/",
};

console.info("Using production DB...");

export const secrets = {
  firebaseCredentials: credentials,
};
