import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputRegister from 'src/component/InputRegister';
import React, {useContext, useState} from 'react';
import { faUserCircle , faEnvelope , faLock , faChevronLeft, faQrcode, faAngleDoubleLeft, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import { Link , useHistory} from 'react-router-dom';
import AniClassApi from "../apis/AniClassApi";
import {convertProgressLengthToPercent} from "../common/Useful";
import {LoadingContext} from "../context/LoadingContext";

const Login = () => {
    const history = useHistory();
    const {percent , setPercent} = useContext(LoadingContext);
    const [inputError , setInputError] = useState({error: false});
    const [submitButton , setSubmitButton] = useState(null);
    const [national , setNational] = useState(null);
    const [pass , setPass] = useState(null);

    const submit = async (element) => {
        element.preventDefault();
        // check validate
        const isNullInputs = isHaveNullInput();
        if(isNullInputs.error){
            setInputError(isNullInputs);
            return; // block submit
        }

        fetchData();
    }


    const fetchData = async () => {
        try {
            setPercent(0);
            submitButton.classList.add('is-loading');

            const result = await AniClassApi('/login-student' , {
                method: 'POST' ,
                data: {
                    password: pass ,
                    national_code: national
                }
            });

            // TODO : handle normal erros
            setPercent(100);
            console.log('fetching' , result.data.data);
            history.push('/reload?login=1');
        } catch (err) {
            setPercent(100);
            console.log(err.message);
        } finally {
            submitButton.classList.remove('is-loading');
        }
    }

    const isHaveNullInput = () => {
        if(national == null || national.length < 1) {
            return {error: "national"};
        }
        if(pass == null || pass.length < 6) {
            return {error: "pass"};
        }

        return {error : false} ;
    }

    return (
        <div id="login" className="fit-footer">
                <div className="container columns m-rl-auto mt-4 mb-4">
                    <div className="column is-3"></div>
                    <div className="column box is-6 mt-6 mb-6" >
                        <form onSubmit={submit}>
                            <div className="columns">
                                <div className="column is-7">
                                    <h3 className="title has-text-primary mb-7 p-2">
                                        ورود به حساب کاربری
                                    </h3>

                                    <InputRegister id={"national"}
                                                   issue={inputError}
                                                   type={'number'}
                                                   msgIssue={"لطفا کد ملی خود را وارد کنید ."}
                                                   onChange={el => setNational(el.target.value)}
                                                   placeholder="کد ملی"
                                                   icon={faQrcode} />

                                    <InputRegister id={"pass"}
                                                   type={'password'}
                                                   issue={inputError}
                                                   onChange={el => setPass(el.target.value)}
                                                   msgIssue={"لطفا رمز عبور خود را وارد کنید ."}
                                                   placeholder="رمز عبور"
                                                   icon={faLock} />
                                </div>

                                <div className="column is-5 is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                                    <button ref={el => setSubmitButton(el)} className="button is-success " >
                                    <span>
                                        ورود
                                    </span>
                                    <span className="icon is-small mr-1">
                                        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                                    </span>
                                    </button>
                                    <br></br>
                                    <p className="content is-size-7">

                                    در حال حاضر حساب ندارید ؟ <Link to="/register" className="has-text-info">این جا</Link> کلیک کنید
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="column is-3"></div>
                </div>
        </div>
    )
}

export default Login;