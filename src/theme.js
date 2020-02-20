import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

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
    fontWeightMedium: 600
  }
});

export default theme;
