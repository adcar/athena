import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Highlighter from "react-highlight-words";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  highlight: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main)
  }
}));

interface IProps {
  ip: string;
  banner: string;
  term: string;
  port: number;
  extra?: any;
}

export default function Host({ ip, banner, port, term, ...extra }: IProps) {
  const classes = useStyles();
  return (
    <Paper className={classes.root} {...extra}>
      <Grid container spacing={4}>
        <Grid item md={2} xs={12}>
          <Typography>{ip}</Typography>
        </Grid>
        <Grid item md={8} xs={12} style={{ overflowX: "auto" }}>
          <Typography
            style={{
              whiteSpace: "pre-wrap"
            }}
          >
            <Highlighter
              highlightClassName={classes.highlight}
              searchWords={[term]}
              autoEscape={true}
              textToHighlight={banner}
            />
          </Typography>
        </Grid>
        <Grid
          xs={12}
          md={2}
          item
          style={{
            flex: 1
          }}
        >
          <Typography align="right">Port: {port}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
