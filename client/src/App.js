import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import {convertProgressLengthToPercent} from "./common/Useful";
import Routes from "./Routes/Route.jsx";
import ScrollTop from "./common/ScrollTop";
import {React, useState, useEffect, useContext} from "react";
import {CircularProgress, createTheme, LinearProgress} from "@material-ui/core";
import {Container, ThemeProvider} from "@material-ui/core";
import RTL from "./Rtl";
import {MainTheme} from "./Themes";
import {useDispatch, useSelector} from "react-redux";
import ProgressbarSlice, { selectProgressbarState } from "./redux/reducers/ProgressbarSlice";
import { setUser, userSelector } from './redux/reducers/UserSlice'
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import JalaliUtils from "@date-io/jalaali";
import JMoment from 'moment-jalaali'
import { getUserInfo } from './apis/AuthApi'
import ProgressbarLoader from './component/ProgressbarLoader'
JMoment.loadPersian({dialect: "persian-modern", usePersianDigits: true})

const App = (props) => {
  const userState = useSelector(userSelector)
  const dispatch  = useDispatch()
  const history = useHistory()
  
  useEffect( () => {
    userAuth()
  }, []);
  
  const userAuth = async () => {
    try {
      const result = await getUserInfo();
      console.log(result.data)
      const { id, firstName , lastName , role ,  email , nationalCode , token} = result.data
      dispatch(setUser({id , nationalCode ,firstName, lastName , email , token , role , isLogin: true}))
      history.push('/')
    } catch (err) {
      history.push('/auth')
      console.log(err)
    }
  };
  
  
  return (
    <ThemeProvider theme={MainTheme}>
      <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
        <RTL>
            <ProgressbarLoader />
            <ScrollTop/>
            <Routes user={userState}/>
        </RTL>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}


export default App;
