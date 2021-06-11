import { faArrowAltCircleLeft, faChevronCircleLeft ,faUserCheck} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, NavLink, Router } from 'react-router-dom'
import { importFromPublic } from 'src/common/Useful'
import Config from '../global/Config';
import InputRegister from './InputRegister'

const MenuMain = (props) => {
    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand pr-5 mr-4">
                    <NavLink className="navbar-item" to="/">
                        <img src={importFromPublic("logo.png")} alt="logo" />
                    </NavLink>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>  

                <div id="navbarBasicExample" className="navbar-menu is-justify-content-space-between">
                    <div className="navbar-start is-size-7 has-text-weight-light">
                            <NavLink to="/" className="navbar-item has-text-white">
                                صفحه اصلی
                            </NavLink>

                            <NavLink to={'/about'} className="navbar-item has-text-white">
                                درباره ما
                            </NavLink>

                        {
                            !props.loggined ? (
                                <NavLink to={'/teacher-register'}
                                         className="navbar-item has-text-white">
                                    ثبت نام اساتید | ورود اساتید
                                </NavLink>
                            ) : ''
                        }
                    </div>

                    <div className="is-pulled-left is-align-self-center">
                        <div className="navbar-item">
                            <div className="buttons">
                                {props.loggined ? (
                                    <Link to={props.panelLink}
                                          className="button ml-2  is-success is-size-7 has-text-weight-normal has-text-gray">
                                    <span>
                                       ورود به پنل کابری
                                    </span>
                                        <span className="icon is-small mr-1">
                                        <FontAwesomeIcon icon={faUserCheck}/>
                                    </span>
                                    </Link>
                                ) : (
                                    <div>
                                        <Link to="/register" className="button ml-2  is-warning is-size-7 has-text-weight-normal has-text-gray">
                                            <span>
                                            عضویت
                                            </span>
                                            <span className="icon is-small mr-1">
                                                <FontAwesomeIcon icon={faChevronCircleLeft} />
                                            </span>
                                        </Link>
                                        <Link to="/login" className="button  is-warning is-size-7 has-text-weight-normal has-text-gray">
                                            <span>
                                                 ورود
                                            </span>
                                            <span className="icon is-small mr-1">
                                              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                                            </span>
                                        </Link>
                                    </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

export default MenuMain;
