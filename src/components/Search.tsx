import React, { useRef, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";

import services from "../services";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%"
  },
  searchIcon: {
    cursor: "pointer"
  },
  search: {
    width: "100%"
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
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    marginTop: theme.spacing(-1),
    width: 500,
    maxWidth: "100%"
  }
}));

interface IProps {
  className?: string;
  defaultTerm?: string;
}

export default function Search(props: IProps) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const textRef = useRef(null);
  const [term, setTerm] = useState("");
  const [focus, setFocus] = useState(false);
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));
  const { q } = router.query;
  function handleSubmit(e) {
    e.preventDefault();
    if (term !== "") router.push(`/results?q=${term}`);
  }
  return (
    <div {...props}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Autocomplete
          PopperComponent={MyPopper}
          ref={textRef}
          classes={{
            listbox: classes.autoCompleteList,
            noOptions: classes.autoCompleteList,
            option: classes.autoCompleteList,
            paper: classes.paper
          }}
          onInputChange={(e, value) => {
            setTerm(value);
          }}
          onOpen={() => setFocus(true)}
          onClose={() => setFocus(false)}
          options={services}
          disableListWrap
          defaultValue={q}
          renderInput={params => (
            <TextField
              {...params}
              fullWidth
              variant="filled"
              label={
                isMedium
                  ? "Search for web services, HTTP codes, and more!"
                  : "Search for services"
              }
              color="secondary"
              className={classes.search}
              InputProps={{
                ...params.InputProps,
                required: true,
                className: classes.inputClass,
                fullWidth: true,
                endAdornment: (
                  <InputAdornment position="end" onClick={handleSubmit}>
                    <SearchIcon className={classes.searchIcon} />
                  </InputAdornment>
                ),
                style: {
                  height: 56,
                  borderTopRightRadius: theme.shape.borderRadius,
                  borderTopLeftRadius: theme.shape.borderRadius,
                  borderBottomRightRadius: focus ? 0 : theme.shape.borderRadius,
                  borderBottomLeftRadius: focus ? 0 : theme.shape.borderRadius
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

function MyPopper({ children, open, anchorEl, ...extra }) {
  return (
    <Popper
      disablePortal
      placement={"bottom"}
      open={open}
      anchorEl={anchorEl}
      {...extra}
      modifiers={{
        flip: {
          enabled: false
        }
      }}
    >
      {children}
    </Popper>
  );
}
