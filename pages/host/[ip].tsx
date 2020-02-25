import React from "react";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Breadcrumbs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../public/athena-logo.svg";
import Link from "../../src/components/Link";

const useStyles = makeStyles(theme => ({
  nav: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  logo: {
    width: 70,
    marginRight: theme.spacing(4)
  },
  link: {
    color: theme.palette.secondary.main
  }
}));

export default function Host() {
  const router = useRouter();
  const { ip, q } = router.query;
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.nav}>
        <Link href="/">
          <img src={logo} alt="Athena Logo" className={classes.logo} />
        </Link>
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
    </Container>
  );
}
