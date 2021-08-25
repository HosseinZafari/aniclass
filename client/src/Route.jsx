import { Route, Switch } from 'react-router';
import Reload from "./common/Reload";
import Auth from "./pages/Auth";
import Main from "./pages/Student/Main";
import Search from "./pages/Student/Search";
import Lesson from "./pages/Student/Lesson";
import DetailLesson from "./pages/Student/DetailLesson";
import Setting from "./pages/Student/Setting";



const Routes = () => {

    return (
        <Switch>
          <Route path="/reload" component={Reload}/>
          <Route exact path="/" onEnter={() => console.log('on enter')} component={Main}/>
          <Route exact path="/auth/" component={Auth}/>
          <Route exact path="/search/" component={Search}/>
          <Route exact path="/lesson/" component={Lesson}/>
          <Route exact path="/setting/" component={Setting}/>
          <Route exact path={"/lesson/:id"} component={DetailLesson}/>
        </Switch>
    );
}


export default Routes;