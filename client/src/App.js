import {BrowserRouter as Router , Switch , Route, useLocation } from "react-router-dom";
import {convertProgressLengthToPercent} from "./common/Useful";
import Routes from "./Route.jsx";
import ScrollTop from "./common/ScrollTop";
import { React , useState , useEffect, useContext } from "react";
import AniClassApi from './apis/AniClassApi';
import {CircularProgress, createTheme, LinearProgress} from "@material-ui/core";
import {Container, ThemeProvider} from "@material-ui/core";
import {amber, deepPurple, yellow} from "@material-ui/core/colors";
import RTL from "./Rtl";

const App = (props) => {

    const theme = createTheme({
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




    useEffect(() => {
  } , []);

  const userAuth = async () => {
      const result = await AniClassApi("/" , {
        method: "GET" ,
        onDownloadProgress: (event) => {
          const percent = convertProgressLengthToPercent(event.loaded , event.total);
        }
      });
  };


  return (
    <ThemeProvider theme={theme}>
        <RTL>
            <Router>
                {/*<LinearProgress style={{width: '100%' , zIndex: 99999 , position: 'fixed' , top: 0 , right: 0 , left: 0}} color={'secondary'} />*/}
                <ScrollTop/>
                <Routes/>
            </Router>
        </RTL>
    </ThemeProvider>
  );
}


export default App;