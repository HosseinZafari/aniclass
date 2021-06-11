import React from 'react'
import {useHistory} from 'react-router-dom';

const PanelClassItem = (props) => {
    const history = useHistory();

    return (
        <div className="following-box card mb-4">
            <div className="card-content">
                <div className="content">
                    <h3 className="is-size-5 has-text-weight-bold">{props.lesson}</h3>
                    <h6 className="mt-2 mb-3 has-text-weight-light">{props.teacher}</h6>
                    <h6 className="mt-2 mb-3 has-text-weight-light">رشته : {props.study} </h6>

                    <div className="is-flex  is-justify-content-space-between mt-5">
                        <button
                            style={{width: "40%"}}
                            onClick={e => history.push(`/class/${props.class_id}`)}
                            className="button is-primary">
                            {props.textButtonRight}
                        </button>

                        <button style={{width: "40%"}}
                                onClick={props.onDanger}
                                className="button is-danger is-light">
                            {props.textButtonLeft}
                        </button>
                    </div>
                    
                </div>
            </div>
        </div> 
    );
}

export default PanelClassItem
