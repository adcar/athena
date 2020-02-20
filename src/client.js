import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";
import { createHttpLink } from "apollo-link-http";

const client = new ApolloClient({
  uri: "https://api.acardosi.dev/v1/graphql"
});
export default client;
