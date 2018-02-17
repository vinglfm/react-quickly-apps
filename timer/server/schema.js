const mongojs = require('mongojs');
const db = mongojs(require('./config').dbUrl);
const {makeExecutableSchema} = require('graphql-tools');

const typeDefs = [`
  type Query {
    log(_id: String) : Log
    logs: [Log]
  }

  type Log {
    _id: String
    time: String
    text: String
  }

  type Mutation {
    create(time: String, text: String): Log
  }

  schema {
    query: Query
    mutation: Mutation
  }
  `];

const resolvers = {
  Query: {
    log: (root, {_id}) => {
      return new Promise((resolve, reject) => {
        db.collection('timer').findOne({'_id': mongojs.ObjectID(_id)}, {'_id': 0}, function(err, data) {
          err ? reject(err) : resolve(data);
        });
      });
    },
    logs: () => {
      return new Promise((resolve, reject) => {
        db.collection('timer').find({}, {'_id': 0}, function(err, data) {
          err ? reject(err) : resolve(data);
        });
      });
    }
  },
  Mutation: {
    create: (root, content) => {
      return new Promise((resolve, reject) => {
        db.collection('timer').insert({'time': content.time, 'text': content.text}, function(err, data) {
          err ? reject(err) : resolve(data);
        });
      });
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
