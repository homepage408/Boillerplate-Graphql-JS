
// import path from 'path';
// import { mergeResolvers } from '@graphql-tools/merge'
// import { loadFilesSync } from '@graphql-tools/load-files'


const path = require("path");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const resolversArray = loadFilesSync(path.join(__dirname));

export default mergeResolvers(resolversArray);