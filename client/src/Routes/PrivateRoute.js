import {Redirect } from 'react-router-dom'
import {Route} from 'react-router-dom'

const PrivateRoute = props => {
  
  return props.isLogin ? <Route {...props}  /> :  <Redirect to={'/auth/'} />
}


export default PrivateRoute