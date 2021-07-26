import { ApolloServer } from 'apollo-server';
import * as mongoose from 'mongoose';
import { typeDefs } from '../apollo/typeDefs';
import { resolvers } from '../apollo/resolvers/room';

export const startServer = async () => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Mongodb is connected successfully');
    const server = new ApolloServer({ typeDefs, resolvers });

    server.listen({ port: 4040 }).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
};
