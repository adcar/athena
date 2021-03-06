import { createMuiTheme } from "@material-ui/core/styles";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3F3D56"
    },
    secondary: {
      main: "#F50057",
      light: "#f0a8c1"
    }
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"],
    fontWeightLight: 800
  },
  shape: {
    borderRadius: 30
  }
});

export default responsiveFontSizes(theme);
