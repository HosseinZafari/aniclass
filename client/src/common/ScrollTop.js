import React from "react";
import { withRouter } from "react-router";

class ScrollTop extends React.Component {

    componentDidUpdate(prevProps) {
        if(this.props.location.pathname !== prevProps.location.pathname) {
            window.scroll(0 , 0);
        }
    }

    render() {
        return null ; 
    }
} 

export  default withRouter(ScrollTop);