/* eslint-disable import-access/jsdoc */
// eslint-disable-next-line import-access/jsdoc
import { register } from "node:module"
import { pathToFileURL } from "node:url"

register("ts-node/esm", pathToFileURL("./"))
