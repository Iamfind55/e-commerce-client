import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: "https://api.tiktokshop.online/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = Cookies?.get("auth_token");
    return {
      headers: {
        ...headers,
        Authorization: token ? token : "",
      },
    };
  });

  const link = ApolloLink.from([authLink, httpLink]);

  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      addTypename: false, // Disable __typename globally
    }),
  });
};

export default createApolloClient;
