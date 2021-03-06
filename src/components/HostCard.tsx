import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Highlighter from "react-highlight-words";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    cursor: "pointer",
    "&:hover": {
      boxShadow: theme.shadows[5]
    }
  },
  highlight: {
    backgroundColor: theme.palette.secondary.light
  }
}));

interface IProps {
  ip: string;
  banner: string;
  term: string;
  port: number;
  extra?: any;
}

export default function HostCard({ ip, banner, port, term, ...extra }: IProps) {
  const classes = useStyles();
  return (
    <Link
      href={{
        pathname: "/host/[ip]",
        query: {
          q: term
        }
      }}
      as={`/host/${ip}?q=${term}`}
    >
      <Paper className={classes.paper} {...extra}>
        <Grid container spacing={4}>
          <Grid item md={2} xs={12}>
            <Typography color="secondary">{ip}</Typography>
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
    </Link>
  );
}
