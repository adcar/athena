import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Highlighter from "react-highlight-words";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Map from "./Map";

const useStyles = makeStyles(theme => ({
  banner: {
    whiteSpace: "pre-wrap"
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  highlight: {
    backgroundColor: theme.palette.secondary.light
  },
  chip: {
    marginBottom: theme.spacing(2)
  },
  portChip: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  title: {
    marginTop: theme.spacing(6)
  },
  map: {
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1]
  }
}));

interface IProps {
  ip: string | string[];
  term: string | string[];
  className?: string;
  loc: string;
}

export default function IpInfo({ ip, term, loc, ...extra }: IProps) {
  const location = loc.split(",");
  const latitude = parseFloat(location[0]);
  const longitude = parseFloat(location[1]);

  const classes = useStyles();
  const GET_IP_INFO = gql`
    query GetIpInfo {
      internet(where: { ip: { _eq: "${ip}" } }) {
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
  let openPorts = new Set();
  let banners = [];

  data.internet.forEach(result => {
    openPorts.add(result.port);
    banners.push({
      banner: result.banner,
      port: result.port
    });
  });
  return (
    <div {...extra}>
      <Typography
        variant="h4"
        component="h2"
        color="primary"
        className={classes.title}
        gutterBottom
      >
        TCP Banners
      </Typography>
      {banners.map((item, index) => {
        let label;
        switch (item.port) {
          case 22:
            label = "SSH";
            break;
          case 23:
            label = "Telnet";
            break;
          case 80:
            label = "HTTP";
            break;
          default:
            label = "";
            break;
        }
        if (item.banner !== null) {
          return (
            <Paper className={classes.paper} key={index}>
              <Chip className={classes.chip} label={label} />
              <Typography className={classes.banner}>{item.banner}</Typography>
            </Paper>
          );
        }
      })}
      <Typography
        variant="h4"
        component="h2"
        color="primary"
        className={classes.title}
      >
        Open Ports
      </Typography>
      <Paper className={classes.paper}>
        {Array.from(openPorts).map((port, index) => (
          <Chip label={port} key={index} className={classes.portChip} />
        ))}
      </Paper>
      <Typography
        variant="h4"
        component="h2"
        color="primary"
        className={classes.title}
        gutterBottom
      >
        Approximate Location
      </Typography>
      <Map latitude={latitude} longitude={longitude} className={classes.map} />
    </div>
  );
}
