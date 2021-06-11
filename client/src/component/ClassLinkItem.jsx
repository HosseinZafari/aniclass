import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const ClassLinkItem = (props)=> {
    let linkItem = undefined;

    if(props.disable) {
        linkItem = <tr className="is-align-center"  >
                    <td className="is-vcentered has-text-primary">{props.description}</td>
                    <td className="is-vcentered has-text-primary">{props.time}</td>
                    <td className="is-vcentered has-text-primary">{props.date}</td>
                    <td className="is-vcentered "> 
                        <button className="button is-light" disabled title="Disabled button"  onClick={()=> window.open(props.link , "_blank")}>
                            <span>
                                ورود به کلاس
                            </span>
                            <span className="icon is-small mr-1">
                                <FontAwesomeIcon icon={faChevronCircleLeft} />
                            </span>
                        </button>
                    </td>

                    { true ?  
                        <td className="is-vcentered has-text-primary">
                            <button className="button is-small is-light " disabled>
                                 به اتمام رسیده
                            </button>
                        </td>  : ''
                    } 

                </tr>
    } else {
        linkItem = <tr className="is-align-center is-selected">
                    <td className="is-vcentered has-text-white">{props.description}</td>
                    <td className="is-vcentered has-text-white">{props.time}</td>
                    <td className="is-vcentered has-text-white">{props.date}</td>
                    <td className="is-vcentered "> 
                        <button className="button is-warning "  onClick={()=> window.open(props.link , "_blank")}>
                            <span>
                                ورود به کلاس
                            </span>
                            <span className="icon is-small mr-1">
                                <FontAwesomeIcon icon={faChevronCircleLeft} />
                            </span>
                        </button>
                    </td>
                    { props.isTeacher ?
                        <td className="is-vcentered has-text-primary">
                            <button className="button is-small is-danger" onClick={(el) => props.onDelete(props.session_id)}>
                                 حذف
                            </button>
                        </td>  : ''
                    } 
                </tr>
    }
    
    return linkItem;
}

export default ClassLinkItem;
