import React from "react";
import { useRouter } from "next/router";

export default function Host() {
  const router = useRouter();
  const { ip } = router.query;

  return <p>IP: {ip}</p>;
}
