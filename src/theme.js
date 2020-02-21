import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3F3D56"
    },
    secondary: {
      main: "#F50057"
    }
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"],
    fontWeightLight: 800
  }
});

export default theme;
