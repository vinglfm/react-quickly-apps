const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const schema = require('./schema');
const {
  PORT = 3000
} = process.env;

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }))

app.use('/build', express.static(path.resolve(process.cwd(), 'build')));

app.use('*', (req, res) => {
  res.sendFile('index.html', {
    root: process.cwd()
  })
});

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
