import {createTheme} from "@material-ui/core";
import {amber, deepPurple, yellow} from "@material-ui/core/colors";
import {palette} from "@material-ui/system";

export const MainTheme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: ["IRANSans" , "serif"].join(",") ,
    fontSize: 12,
  } ,
  palette: {
    primary: {
      main: deepPurple[700],
      light: deepPurple[400] ,
    } ,
    secondary: {
      main: amber[600] ,
      light: yellow[400],
    }
  } ,
});

export const DrawerTheme = createTheme({
  ...MainTheme ,
  overrides: {
    MuiTouchRipple: {
      child: {
        backgroundColor: MainTheme.palette.primary.main
      }
    }
  }
});