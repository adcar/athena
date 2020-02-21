import React from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../public/athena-logo.svg";
import Search from "../src/components/Search";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    minHeight: "100vh",
    flexDirection: "column"
  },
  logo: {
    width: 300
  },
  search: {
    marginTop: theme.spacing(4)
  }
}));

export default function Index() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <img src={logo} alt="Athena logo" className={classes.logo} />
      <Typography
        variant="h1"
        color="primary"
        style={{ position: "relative", zIndex: -1 }}
      >
        Athena
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Search the TCP banners of millions of IPs on port 80, 22, and 23
      </Typography>
      <Search className={classes.search} />
    </Container>
  );
}
