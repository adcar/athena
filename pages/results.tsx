import React from "react";
import Results from "../src/components/Results";
import Nav from "../src/components/Nav";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: "95vh",
    padding: theme.spacing(1)
  }
}));

export default function results() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Nav />
      <Results />
    </div>
  );
}
