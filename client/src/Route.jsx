import { Route, Switch } from 'react-router';
import Reload from "./common/Reload";
import Auth from "./pages/Auth";



const Routes = () => {

    return (
        <Switch>
          <Route path="/reload" component={Reload}/>
          <Route exact path="/" onEnter={() => console.log('on enter')} component={Auth}/>
          {/*<Route exact path="/auth/" component={Register}/>*/}
        </Switch>
    );
}


export default Routes;