import React from "react";
import NextLink from "next/link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

interface IProps {
  children?: any;
  href: string;
}

export default function Link(props: IProps) {
  const classes = useStyles();
  return (
    <NextLink passHref {...props}>
      <a className={classes.root}>{props.children}</a>
    </NextLink>
  );
}
