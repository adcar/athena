import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Loader from "react-spinners/BounceLoader";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core";
import bugSvg from "../../public/bug.svg";
import blankCanvasSvg from "../../public/blank_canvas.svg";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import HostCard from "./HostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { BounceLoader } from "react-spinners";
const useStyles = makeStyles(theme => ({
  wrapper: {
    height: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  loadingWrapper: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center"
  },
  img: {
    width: "100%",
    maxWidth: "100%",
    maxHeight: "50vh",
    marginTop: theme.spacing(4)
  }
}));
export default function Results() {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const { q } = router.query;
  const GET_RESULTS = gql`
    query getResults($offset: Int, $limit: Int) {
      internet(
        where: { banner: { _ilike: "%${q}%" } }
        limit: $limit
        offset: $offset
      ) {
        ip
        banner
        port
      }
    }
  `;
  const { loading, error, data, fetchMore } = useQuery(GET_RESULTS, {
    variables: {
      offset: 0,
      limit: 10
    }
  });

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
          <Typography variant="subtitle1">
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
          <Typography variant="subtitle1">
            We're not sure what happened.
          </Typography>
          <img src={bugSvg} className={classes.img} alt="Bug" />
        </div>
      );
    }
  }

  return (
    <Container>
      <InfiniteScroll
        dataLength={data.internet.length}
        next={() =>
          fetchMore({
            variables: {
              offset: data.internet.length
            },
            updateQuery: (prev: any, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                setHasMore(false);
                return prev;
              }
              return Object.assign({}, prev, {
                internet: [...prev.internet, ...fetchMoreResult.internet]
              });
            }
          })
        }
        hasMore={hasMore}
        loader={
          <div className={classes.loadingWrapper}>
            <BounceLoader color={theme.palette.secondary.main} />
          </div>
        }
      >
        {data.internet.map((result, index) => (
          <HostCard {...result} term={q} key={index} />
        ))}
      </InfiniteScroll>
    </Container>
  );
}
