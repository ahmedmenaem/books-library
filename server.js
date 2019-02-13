const { ApolloServer } = require("apollo-server");
const { loadTypeSchema } = require("./utils/schema");
const { connect } = require("./db");
const { dbUrl } = require("./config/dev");
const authoResolvers = require("./types/author/author.resolvers");
const bookResolvers = require("./types/book/book.resolvers");

const types = ["author", "book"];

const start = async () => {
  const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
  `;
  const schemaTypes = await Promise.all(types.map(loadTypeSchema));

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: {
      ...authoResolvers,
      ...bookResolvers,
      Query: {
        ...authoResolvers.Query,
        ...bookResolvers.Query
      },
      Mutation: {
        ...authoResolvers.Mutation,
        ...bookResolvers.Mutation
      }
    },
    context: async ({ req }) => {
      return {};
    }
  });

  await connect(dbUrl);

  const { url } = await server.listen({ port: 4000 });
  console.log(`🚀 Server ready at ${url}`);
};

module.exports = {
  start
};
