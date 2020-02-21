import React from "react";
import Search from "../src/components/Search";
import Results from "../src/components/Results";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: "95vh",
    padding: theme.spacing(4)
  }
}));

export default function results() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Search />
      <Results />
    </div>
  );
}
