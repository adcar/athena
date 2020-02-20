import React, { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import logo from "../public/athena-logo.svg";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";

const transition = "all 0.75s ease-in-out";
const RADIUS = 30;
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    minHeight: "100vh",
    flexDirection: "column"
  },
  search: {
    width: "100%",
    maxWidth: 900
  },
  input: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  inputLabel: {
    padding: `0 ${theme.spacing(2)}px`,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  inputClass: {},
  autoCompleteList: {
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
    padding: theme.spacing(1),

    marginTop: theme.spacing(-1)
  },
  logo: {
    width: 300
  },
  form: {
    marginTop: theme.spacing(4),
    width: 500
  },
  searchIcon: {
    cursor: "pointer"
  }
}));
const services = ["Apache", "Lighttpd", "Nginx", "OpenSSH"];

export default function Index() {
  const router = useRouter();
  const textRef = useRef(null);
  const height = 100;
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [focus, setFocus] = useState(false);
  const classes = useStyles();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // setOpen(true);
    // textRef.current.blur();
    router.push(`/results?q=${term}`);
  }

  return (
    <Container className={classes.root}>
      <img src={logo} alt="Athena logo" className={classes.logo} />
      <Typography
        variant="h1"
        color="primary"
        style={{ fontWeight: 800, position: "relative", zIndex: -1 }}
      >
        Athena
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Search the TCP banners of millions of IPs on port 80, 22, and 23
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Autocomplete
          ref={textRef}
          classes={{
            listbox: classes.autoCompleteList,
            noOptions: classes.autoCompleteList,
            option: classes.autoCompleteList,
            paper: classes.paper
          }}
          style={{
            transform: open
              ? `translateY(-${textRef.current.getBoundingClientRect().y}px)`
              : "none"
          }}
          onOpen={() => setFocus(true)}
          onClose={() => setFocus(false)}
          options={services}
          renderInput={params => (
            <TextField
              {...params}
              variant="filled"
              label="Search for services"
              color="secondary"
              autoFocus
              className={classes.search}
              InputProps={{
                ...params.InputProps,
                onChange: e => {
                  setTerm(e.target.value);
                },
                className: classes.inputClass,
                fullWidth: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon className={classes.searchIcon} />
                  </InputAdornment>
                ),
                style: {
                  height: 56,
                  borderTopRightRadius: RADIUS,
                  borderTopLeftRadius: RADIUS,
                  borderBottomRightRadius: focus ? 0 : RADIUS,
                  borderBottomLeftRadius: focus ? 0 : RADIUS
                },
                classes: {
                  root: classes.input
                },
                disableUnderline: true
              }}
              InputLabelProps={{
                classes: {
                  root: classes.inputLabel
                }
              }}
            />
          )}
        />
      </form>
    </Container>
  );
}
