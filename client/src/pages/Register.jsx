import React, {useContext, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowAltCircleLeft, faEnvelope, faLock, faQrcode, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import InputRegister from 'src/component/InputRegister';
import { Link  } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import AniClassApi from "../apis/AniClassApi";
import {convertProgressLengthToPercent, isEnableProgressBar} from "../common/Useful";
import { LoadingContext } from 'src/context/LoadingContext';

const Register = () =>  {
    const history = useHistory();
    const {percent , setPercent} = useContext(LoadingContext)
    const [name , setName] = useState(null);
    const [family , setFmaily] = useState(null);
    const [email , setEmail] = useState(null);
    const [national , setNational] = useState(null);
    const [pass , setPass] = useState(null);
    const [confirm , setConfirm] = useState(null);
    const [inputError , setInputError] = useState({error: false});
    var   [registerButton , setRegisterButton] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();
        // check validate
        const isNullInputs = isHaveNullInput()
        if(isNullInputs.error) {
            setInputError(isNullInputs);
            return ; // block submit
        }

        // clear errors
        setInputError({error: false});
        fetchRegister();

    }
    const fetchRegister = async () => {
        try {
            setPercent(1)
            registerButton.classList.add('is-loading');

            const result = await AniClassApi('/register-student' , {
                method: "POST" ,
                data: {
                    name: name ,
                    family: family ,
                    national_code: national ,
                    email: email ,
                    password: pass
                } ,
                onDownloadProgress: (event) => {
                    const percent = convertProgressLengthToPercent(event.loaded , event.total);
                    setPercent(percent);
                }
            });

            history.push(`/reload?register=1`); // redirect to main page
        } catch(err) {
            console.log(err); // TODO : handle error
        } finally {
            setPercent(100);
            registerButton.classList.remove('is-loading');
        }


    }
    const isHaveNullInput = () => {
        if(name == null || name.length < 1) {
            return {error: "name"};
        }
        if(family == null || family.length < 1) {
            return {error: "family"};
        }
        if(national == null || national.length < 1) {
            return {error: "national"};
        }
        if(pass == null || pass.length < 6) {
            return {error: "pass"};
        }
        if(confirm !== pass) {
            return {error: "confirm"};
        }
        if(email == null || email.length < 6) {
            return {error: "email"}
        }
        return {error : false} ;
    }

    return (
        <div id="register" className="full-height">
                <div className="container columns m-rl-auto mt-4 mb-4">
                    <div className="column is-3"></div>
                    <div className="column box is-6" >
                        <form onSubmit={onSubmit}>
                            <div className="columns">
                                <div className="column is-7">
                                    <h3 className="title has-text-primary mb-7 p-2">
                                        عضویت در آنی کلاس
                                    </h3>
                                    <InputRegister id={"name"}
                                                   issue={inputError}
                                                   msgIssue={'لطفا نام خود را وارد کنید'}
                                                   type="text"
                                                   onChange={el => setName(el.target.value)}
                                                   placeholder="نام" icon={faUserCircle} />

                                    <InputRegister id={"family"}
                                                   issue={inputError}
                                                   msgIssue={'لطفا نام خانوادگی خود را وارد کنید'}
                                                   type="text"
                                                   onChange={el => setFmaily(el.target.value)}
                                                   placeholder="نام خانوادگی" icon={faUserCircle}/>

                                    <InputRegister id={"email"}
                                                   type="email"
                                                   issue={inputError}
                                                   msgIssue={'لطفا ایمیل صحیحی را وارد کنید'}
                                                   onChange={el => setEmail(el.target.value)}
                                                   placeholder="ایمیل" icon={faEnvelope}/>

                                    <InputRegister id={"national"}
                                                   type="number"
                                                   msgIssue={'لطفا کد ملی خود را وارد کنید'}
                                                   issue={inputError}
                                                   onChange={el => setNational(el.target.value)}
                                                   placeholder="کد ملی" icon={faQrcode}/>

                                    <InputRegister id={"pass"}
                                                   type="password"
                                                   msgIssue={'رمز عبور مورد نظر باید بیشتر از 6 کلمه باشد'}
                                                   issue={inputError}
                                                   onChange={el => setPass(el.target.value)}
                                                   placeholder="رمز عبور" icon={faLock}/>

                                    <InputRegister id={"confirm"}
                                                   type="password"
                                                   msgIssue={'تکرار رمز عبور مطابقت ندارد'}
                                                   issue={inputError}
                                                   onChange={el => setConfirm(el.target.value)}
                                                   placeholder="تکرار رمز عبور " icon={faLock}/>
                                </div>
                                <div className="column is-5 is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                                    <button ref={el => setRegisterButton(el) } className={`button is-success`}  type={"submit"}>
                                        <span>
                                        ثبت نام
                                    </span>
                                        <span className="icon is-small mr-1" >
                                        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                                    </span>
                                    </button>
                                    <br></br>
                                    <p className="content is-size-7">
                                        در حال حاضر حساب دارید ؟ <Link to="/login" className="has-text-info">این جا</Link> کلیک کنید
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

export default Register;