import {BrowserRouter as Router , Switch , Route, useLocation } from "react-router-dom";
import Footer from "./component/Footer";
import Header from "./component/Header";
import ScrollTop from "./common/ScrollTop";
import { React , useState , useEffect, useContext} from "react";
import AniClassApi from './apis/AniClassApi';
import  { LoadingContext } from "src/context/LoadingContext";
import RoutesApp from "./Route.jsx";
import {convertProgressLengthToPercent} from "./common/Useful";
import { UserContext }  from "src/context/UserContext";

const App = (props) => { 
  const [isError , setIsError] = useState(false);
  const {user , setUser} = useContext(UserContext);
  const {percent , setPercent} = useContext(LoadingContext);

  useEffect(() => {
    try {
      setPercent(0);
      userAuth();
    } catch(err) {
      setIsError(true); // TODO : Create error page
    } finally {
      setPercent(100);
    }
  } , []);

  const userAuth = async () => {
      const result = await AniClassApi("/" , {
        method: "GET" ,
        onDownloadProgress: (event) => {
          const percent = convertProgressLengthToPercent(event.loaded , event.total);
          setPercent(percent);
        }
      });
      setUser(result.data.data);
  };


  return (
    <div className="container.is-widescreen" style={{height: "100%"}}>
        <Router>
          <ScrollTop />
          <Header loggined={user != null ? user.loggined : false} isTeacher={user != null ? user.is_teacher : false}/>
          <RoutesApp />
          <Footer />
        </Router>
      </div>
  );
}


export default App;