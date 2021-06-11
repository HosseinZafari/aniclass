import React, { Component } from 'react'

export default class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="columns mt-5 mb-5">
                <div id="title-page"  className="box column is-10 m-rl-auto is-offset-2 p-0 border-bottom-right mt-6 mb-3">
                    <h2 className="has-text-white is-center-text has-background-primary is-size-4 has-text-weight-bold p-2">
                        {this.props.title}    
                    </h2>
                    <p className="p-5 has-text-justified">
                        {this.props.children}
                    </p>
                </div>
            </div>
        )
    }
}

