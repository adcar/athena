import React, { FormEvent, useRef, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";

const services = ["Apache", "Lighttpd", "Nginx", "OpenSSH"];

const RADIUS = 30;
const useStyles = makeStyles(theme => ({
  form: {
    width: 500,
    maxWidth: "100%"
  },
  searchIcon: {
    cursor: "pointer"
  },
  search: {
    width: 500,
    maxWidth: "100%"
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
  }
}));

interface IProps {
  className?: string;
}

export default function Search(props: IProps) {
  const classes = useStyles();
  const router = useRouter();
  const textRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [focus, setFocus] = useState(false);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // setOpen(true);
    // textRef.current.blur();
    router.push(`/results?q=${term}`);
  }
  return (
    <div {...props}>
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
          onInputChange={(e, value) => {
            setTerm(value);
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
              className={classes.search}
              InputProps={{
                ...params.InputProps,
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
    </div>
  );
}
