import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Loader from "react-spinners/BounceLoader";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core";
import bugSvg from "../../public/bug.svg";
import blankCanvasSvg from "../../public/blank_canvas.svg";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  wrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  img: {
    width: 500,
    maxWidth: "100%"
  }
}));
export default function Results() {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const { q } = router.query;
  const EXCHANGE_RATES = gql`
{
  internet(where:{banner: {_ilike: "%${q}%"}}, limit:30) {
    ip
    banner
    port
  }
}
`;
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading)
    return (
      <div className={classes.wrapper}>
        <Loader color={theme.palette.secondary.main} size={50} />
      </div>
    );
  if (error) {
    if (error.message.includes("GraphQL error: postgres query error")) {
      return (
        <div className={classes.wrapper}>
          <Typography variant="h2" component="h1" color="primary">
            No Results Found
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Try picking one of the suggested search queries
          </Typography>
          <img
            src={blankCanvasSvg}
            className={classes.img}
            alt="Blank Canvas"
          />
        </div>
      );
    } else {
      return (
        <div className={classes.wrapper}>
          <Typography variant="h2" component="h1" color="primary">
            An unknown error occurred
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            We're not sure what happened.
          </Typography>
          <img src={bugSvg} className={classes.img} alt="Bug" />
        </div>
      );
    }
  }

  console.log(data);

  return <h1>Now this is a bruh moment</h1>;
}
