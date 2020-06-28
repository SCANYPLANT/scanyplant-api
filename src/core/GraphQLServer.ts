import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

const graphqlServer = async (app: any) => {
    const schema = await buildSchema({ resolvers: [] });
    const server = new ApolloServer({
        schema,
    });

};
export default graphqlServer;
