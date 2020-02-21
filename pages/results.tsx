import React from "react";
import Search from "../src/components/Search";
import Results from "../src/components/Results";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../public/athena-logo.svg";
import Link from "next/link";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    height: "95vh",
    padding: theme.spacing(4)
  },
  nav: {
    display: "flex",
    alignItems: "center",
    height: 100,
    justifyContent: "flex-start"
  },
  logo: {
    width: 70,
    marginRight: theme.spacing(2),
    cursor: "pointer"
  },
  search: {
    flex: 1,
    maxWidth: 500
  }
}));

export default function results() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.nav}>
        <Link href="/">
          <img src={logo} alt="Athena Logo" className={classes.logo} />
        </Link>
        <Search className={classes.search} />
      </Container>

      <Results />
    </div>
  );
}
