import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

interface IProps {}

export default function Results(props: IProps) {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <h1>query: {q}</h1>;
}
