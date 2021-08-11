import React, {useContext} from 'react';
import {withRouter , useHistory} from 'react-router-dom';
import {UserContext} from "../context/UserContext";
import {convertProgressLengthToPercent, useQuery} from "./Useful";
import AniClassApi from "../apis/AniClassApi";
import {LoadingContext} from "../context/LoadingContext";

const Reload = (props) => {
    const {user , setUser} = useContext(UserContext);
    const {percent , setPercent} = useContext(LoadingContext);
    const query  =  useQuery();
    const history = useHistory();

    const userAuth = async (params) => {
        const result = await AniClassApi("/" , {
            method: "GET"
        });
        console.log("user Index");

        console.log(result.data.data);
        setUser(result.data.data);
        switch (params) {
            case 'login':
            history.push('/?loggind=true');
            break;

            case 'register':
            history.push('/?registerd=true');
            break;

            case 'updated':
            history.push('/?updated=true');
            break;
        }
    };

    if(query.get('clear')) {
        setUser('');
        history.push('/');
        console.log('clearrrr');
    }

    if(query.get('register')) {
        console.log('seeeeeeeeeet');
        setPercent(0);
        try {
            userAuth('register');
        } catch(err) {
            console.log(err);
        } finally {
            setPercent(100);
        }
    }

    if(query.get('login')) {
        console.log('logiiin');
        try {
            setPercent(0)
            userAuth('login');
            setPercent(100)
        } catch(err) {
            console.log(err);
            setPercent(100)
        }
    }

    if(query.get('updated')) {
        console.log('udpateddd');
        try {
            setPercent(0)
            userAuth('updated');
            setPercent(100)
        } catch(err) {
            console.log(err);
            setPercent(100)
        }
    }

    return null;
}

export default withRouter(Reload);


