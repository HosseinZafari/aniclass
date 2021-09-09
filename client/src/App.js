import {BrowserRouter as Router, Switch, Route, useLocation} from "react-router-dom";
import {convertProgressLengthToPercent} from "./common/Useful";
import Routes from "./Routes/Route.jsx";
import ScrollTop from "./common/ScrollTop";
import {React, useState, useEffect, useContext} from "react";
import AniClassApi from './apis/AniClassApi';
import {CircularProgress, createTheme, LinearProgress} from "@material-ui/core";
import {Container, ThemeProvider} from "@material-ui/core";
import {amber, deepPurple, yellow} from "@material-ui/core/colors";
import RTL from "./Rtl";
import {MainTheme} from "./Themes";
import {useDispatch, useSelector} from "react-redux";
import {
  selectProgressbarState
} from "./redux/reducers/ProgressbarSlice";
import {userSelector} from "./redux/reducers/UserSlice";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import JalaliUtils from "@date-io/jalaali";
import JMoment from 'moment-jalaali'
JMoment.loadPersian({dialect: "persian-modern", usePersianDigits: true})

const App = (props) => {
  const progressbarState = useSelector(selectProgressbarState)
  const userState = useSelector(userSelector)
  
  useEffect(() => {
  }, []);
  
  const userAuth = async () => {
    const result = await AniClassApi("/", {
      method: "GET",
      onDownloadProgress: (event) => {
        const percent = convertProgressLengthToPercent(event.loaded, event.total);
      }
    });
  };
  
  
  return (
    <ThemeProvider theme={MainTheme}>
      <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
        <RTL>
          <Router>
            {
              progressbarState && <LinearProgress style={{
                width: '100%',
                zIndex: 99999,
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0
              }} color={'secondary'}/>
            }
            <ScrollTop/>
            <Routes user={userState}/>
          </Router>
        </RTL>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}


export default App;
