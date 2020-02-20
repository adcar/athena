import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function Results() {
  const router = useRouter();
  const { q } = router.query;
  const EXCHANGE_RATES = gql`
{
  internet(where:{banner: {_ilike: "%${q}%"}}, limit:100) {
    ip
    banner
    port
  }
}
`;
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  console.log(data);

  if (loading) return <ClimbingBoxLoader />;
  if (error) return <p>Error :(</p>;

  return <h1>query: {q}</h1>;
}
