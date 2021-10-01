import React, {useContext} from 'react';
import {withRouter , useHistory} from 'react-router-dom';
import {convertProgressLengthToPercent, useQuery} from "./Useful";
import Index from "../apis";

const Reload = (props) => {
    const query  =  useQuery();
    const history = useHistory();


    if(query.get('clear')) {
        history.push('/auth');
    }

    if(query.get('register')) {
        console.log('register')
        history.push('/');
    }

    if(query.get('login')) {
        history.push('/');
    }

    if(query.get('updated')) {
        history.push('/?update=1');
    }

    return null;
}

export default withRouter(Reload);


