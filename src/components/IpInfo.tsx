import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

interface IProps {
  ip: string | string[];
}

export default function IpInfo({ ip }: IProps) {
  const GET_IP_INFO = gql`
    query GetIpInfo {
      internet(where: { ip: { _eq: "39.98.47.180" } }) {
        banner
        port
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_IP_INFO);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Failed to retrieve data for this IPs</h1>;
  }

  return <h1>ip: {ip}</h1>;
}
