import React, { useContext } from 'react';
import { LoadingContextProvider, LoadingContext } from 'src/context/LoadingContext';
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";

const Footer = (props) => { 
    const {user , setUser} = useContext(UserContext)

    return (
        <footer id="footer-main" className="footer container.is-widescreen has-background-light">
            <div className="container">
                <div className="columns">
                    <div className="column is-3 is-size-6">
                        <ul>
                            <li><Link to="/">صفحه اصلی</Link></li>
                            <li><Link to="/about">درباره ما</Link></li>
                        </ul>
                    </div>
                    
                    <div className="column is-3 is-size-6 has-text-weight-light">
                        {user == null ? (
                                <ul>
                                    <li><Link to="/login">ورود</Link></li>
                                    <li><Link to="/singup">ثبت نام</Link></li>
                                </ul>
                        ) : ''}
                    </div>

                    <div className="column has-text-centered is-5 is-offest-1 is-size-4 has-text-weight-light">
                        <span className="tag is-warning is-size-6 mb-2">
                            تمامی حقوق این سایت برای آنی کلاس محفوظ است. نقل مطالب با ذکر منبع بلامانع است.
                        </span>
                        <span className="tag is-warning is-size-6">
                            Copyright © 2021 AniClass Learning Agancy, All rights reserved
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;