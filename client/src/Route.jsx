import StudentClazz from './pages/StudentClazz';
import Home from './pages/Home';
import Login from "./pages/Login";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherRegister from "./pages/TeacherRegister";
import StudentPanelSetting from "./pages/StudentPanelSetting";
import StudentPanelFollowing from "./pages/StudentPanelFollowing";
import StudentPanelLogout from "./pages/StudentPanelLogout";
import TeacherPanelClass from "./pages/TeacherPanelClass";
import TeacherPanelLogout from "./pages/TeacherPanelLogout";
import TeacherPanelSetting from "./pages/TeacherPanelSetting";
import TeacherPanelAddClass from "./pages/TeacherPanelAddClass";
import Page from "./pages/Page";
import PageAbout from "./pages/PageAbout";
import PageContactUs from "./pages/PageContactUs";
import Register from './pages/Register';
import { Route, Switch } from 'react-router';
import { useContext } from 'react';
import { LoadingContext } from './context/LoadingContext';
import { Redirect } from "react-router-dom";
import Reload from "./common/Reload";
import ClassItem from "./component/ClassItem";
import ClassEdit from "./pages/ClassEdit";
import {UserContext} from "./context/UserContext";
import TeacherClazz from "./pages/TeacherClazz";



const RoutesApp = () => {
    const {user , setUser} = useContext(UserContext);

    const getClassPage = () => {
          if(user != null && user.is_teacher){
                return TeacherClazz;
          } else {
                return StudentClazz;
          }

    }

    return (
        <Switch>
          <Route path="/reload" component={Reload}/>
          <Route exact path="/" onEnter={() => console.log('on enter')} component={Home} loading/>
          <Route exact path="/register/" component={Register}/>
          <Route exact path="/teacher-login/" component={TeacherLogin}/>
          <Route exact path="/teacher-register/" component={TeacherRegister}/>
          <Route exact path="/student-panel/setting" component={StudentPanelSetting}/>
          <Route exact path="/student-panel/following" component={StudentPanelFollowing}/>
          <Route exact path="/student-panel/logout" component={StudentPanelLogout}/>
          <Route exact path="/teacher-panel/new-class" component={TeacherPanelAddClass}/>
          <Route exact path="/teacher-panel/lessons" component={TeacherPanelClass}/>
          <Route exact path="/teacher-panel/setting" component={TeacherPanelSetting}/>
          <Route exact path="/teacher-panel/logout" component={TeacherPanelLogout}/>
  
          <Route exact path="/about" component={PageAbout}/>
          <Route exact path="/contact-us" component={PageContactUs}/>
  
          <Route exact path="/login/" component={Login}/>
          <Route exact path="/class/:id" component={getClassPage()}/>
          <Route exact path="/class/:id/edit" component={ClassEdit}/>

        </Switch>
    );
}


export default RoutesApp;