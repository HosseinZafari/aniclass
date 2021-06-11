import React from 'react'
import { Link } from 'react-router-dom';

const ClassItem = (props) => {
    return (
        <article  className="card class-item is-flex is-flex-direction-column has-background-white mb-4 mt-1 mr-3 ml-3">
            <div className="content">
                <div className="card-content">
                    <h5 className="title is-5">{props.title}</h5>
                    <span className="is-6 has-text-weight-light tag is-success"> دپارتمان : {props.department}  </span><br></br>
                    <span className="is-6 has-text-weight-light tag is-success">استاد : {props.teacher}</span><br></br>
                    <span className="is-6 has-text-weight-light tag ">
                        {props.uni}
                    </span><br></br>
                </div>
                <Link to={props.link} style={{width: "100%"}} className="button is-root">ورود</Link>
            </div>
        </article>
    )
}

export default ClassItem;
