import React, { useContext, useEffect , useState } from 'react';
import TabMain  from './TabMain';
import MenuMain from './MenuMain';

import { LoadingContext } from 'src/context/LoadingContext';

const Header = (props) => {
    const ProgressBar = require('react-progress-bar-plus'); 
    const {percent , setPercent} = useContext(LoadingContext);


    useEffect(() => {
    }, []);
    
    const getPanelLink = () => {
        if(props.isTeacher)
            return '/teacher-panel/setting'
        else
            return '/student-panel/setting'
    }

    return ( 
        <header id="main-header" style={{marginTop: "58px"}}>
            <MenuMain loggined={props.loggined} panelLink={getPanelLink()}/>
            <ProgressBar intervalTime={200} autoIncrement={true} percent={Array.isArray(percent) ? -1 : percent} spinner={"right"}/>
        </header>
    );
}

export default Header ;