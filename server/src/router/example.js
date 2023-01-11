const express = require('express');
const router = express.Router();
const {graphqlHTTP} = require('express-graphql')

const {makeExecutableSchema} = require('@graphql-tools/schema')
const {loadFilesSync} = require('@graphql-tools/load-files');
const path = require('path')
const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql']
})

const resolversArray = loadFilesSync(path.join(__dirname,'..', '**/*.resolvers.js'))

const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
});



router.use('/', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

module.exports = router;