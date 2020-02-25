import React from "react";
import fetch from "isomorphic-fetch";
import { getName } from "country-list";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Breadcrumbs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "../../src/components/Link";
import BackIcon from "@material-ui/icons/ArrowBackSharp";

const useStyles = makeStyles(theme => ({
  nav: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2)
  },
  back: {
    marginRight: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.main
    }
  },
  link: {
    color: theme.palette.secondary.main
  }
}));

interface IInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
}
interface IProps {
  info: IInfo;
}

export default function Host({ info }: IProps) {
  const router = useRouter();
  const { ip, q } = router.query;
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.nav}>
        <BackIcon
          fontSize="large"
          className={classes.back}
          onClick={() => router.back()}
        />

        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Athena</Link>
          <Link href={q ? `/results?q=${q}` : "/results?q=Apache"}>
            Results
          </Link>
          <Typography color="textPrimary">{ip}</Typography>
        </Breadcrumbs>
      </div>

      <Typography variant="h1" color="primary">
        {ip}
      </Typography>
      <Typography variant="subtitle1">
        {info.city}, {info.region}, {getName(info.country)}
      </Typography>
    </Container>
  );
}

Host.getInitialProps = async context => {
  const { ip } = context.query;
  const res = await fetch(
    `https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_KEY}`
  );
  const info = await res.json();
  return { info };
};
