import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputRegister = (props) => {
    return (
        <div className="field">
            <div className="control has-icons-right">
                <div className="control mb-5">
                    <input id={props.id} type={props.type} onChange={props.onChange} className="input is-primary" ref={props.inputRef} value={props.value} placeholder={props.placeholder}/>
                    <span className="icon is-small is-right">
                        <FontAwesomeIcon icon={props.icon} />
                    </span>
                    {
                        props.id === props.issue.error ?
                        <p className="help is-danger">
                            {props.msgIssue}
                        </p> :  ''
                    }
                </div>
            </div>

        </div>
    )
}

export default InputRegister;