import {Route, Switch} from 'react-router-dom';
import Reload from "../common/Reload";
import Auth from "../pages/Auth";
import Main from "../pages/Student/Main";
import Search from "../pages/Student/Search";
import Lesson from "../pages/Student/Lesson";
import DetailLesson from "../pages/Student/DetailLesson";
import Setting from "../pages/Student/Setting";
import PrivateRoute from "./PrivateRoute";


const Routes = (props) => {
  
  return (
    <Switch>
      <Route path="/reload" component={Reload}/>
      <Route exact path="/auth/" component={Auth}/>
      <PrivateRoute isLogin={props.user.isLogin} exact path="/" component={Main}/>
      <PrivateRoute isLogin={props.user.isLogin} exact path="/search/" component={Search}/>
      <PrivateRoute isLogin={props.user.isLogin} exact path="/lesson/" component={Lesson}/>
      <PrivateRoute isLogin={props.user.isLogin} exact path="/setting/" component={Setting}/>
      <PrivateRoute isLogin={props.user.isLogin} exact path={"/lesson/:id"} component={DetailLesson}/>
    </Switch>
  );
}


export default Routes;