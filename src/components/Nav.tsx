import Container from "@material-ui/core/Container";
import Link from "next/link";
import logo from "../../public/athena-logo.svg";
import Search from "./Search";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    height: 100,
    justifyContent: "flex-start"
  },
  search: {
    flex: 1,
    maxWidth: 500
  },
  logo: {
    width: 70,
    marginRight: theme.spacing(2),
    cursor: "pointer"
  }
}));

export default function Nav() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Link href="/">
        <img src={logo} alt="Athena Logo" className={classes.logo} />
      </Link>
      <Search className={classes.search} />
    </Container>
  );
}
