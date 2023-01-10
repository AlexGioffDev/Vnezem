const express = require('express');
const router = express.Router();
const {buildSchema} = require('graphql');
const {graphqlHTTP} = require('express-graphql')

const schema = buildSchema(`
    type Query {
        message: String
    }
`);


const root = {
    message: () => 'Hello!'
}

router.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

module.exports = router;