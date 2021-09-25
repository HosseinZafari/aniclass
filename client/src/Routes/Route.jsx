import {Route, Switch} from 'react-router-dom';
import React from 'react'
import Reload from "../common/Reload";
import PrivateRoute from "./PrivateRoute";
import LoadLib from "../common/LoadLib";
import {Suspense} from "react";
import {CircularProgress, LinearProgress} from "@material-ui/core";

const Routes = (props) => {
  const Main = LoadLib(props.user.role , import('../pages/Student/Main.jsx') ,import('../pages/Teacher/Main.jsx'))
  const Search = LoadLib(props.user.role , import('../pages/Student/Search') ,import('../pages/Teacher/Search'))
  const Lesson = LoadLib(props.user.role , import('../pages/Student/Lesson') ,import('../pages/Teacher/Lesson'))
  const Setting = LoadLib(props.user.role , import('../pages/Student/Setting') ,import('../pages/Teacher/Setting'))
  const DetailLesson = LoadLib(props.user.role , import('../pages/Student/DetailLesson') ,import('../pages/Teacher/DetailLesson'))
  const Auth = React.lazy(() => import('../pages/Auth'))
  
  return (
    <Suspense fallback={<CircularProgress style={{position: 'fixed' , inset: '50%'  , zIndex: 99999 , width: 30 , height: 30}}/>}>
      <Switch>
        <Route path="/reload" component={Reload}/>
        {
          !props.user.isLogin ? (<Route exact path="/auth/" component={Auth}/>) : (<Route exact path="/" component={Main}/>)
        }
        
        <PrivateRoute isLogin={props.user.isLogin} exact path="/" component={Main}/>
        <PrivateRoute isLogin={props.user.isLogin} exact path="/search/" component={Search}/>
        <PrivateRoute isLogin={props.user.isLogin} exact path="/lesson/" component={Lesson}/>
        <PrivateRoute isLogin={props.user.isLogin} exact path="/setting/" component={Setting}/>
        <PrivateRoute isLogin={props.user.isLogin} exact path={"/lesson/:id"} component={DetailLesson}/>
      </Switch>
    </Suspense>
  );
}


export default Routes;
