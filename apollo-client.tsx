import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://klyjbmqt8c.execute-api.ap-southeast-1.amazonaws.com/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
