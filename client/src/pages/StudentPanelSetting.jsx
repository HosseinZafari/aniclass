import {
    faChevronLeft,
    faCode,
    faEnvelope,
    faLock, faQrcode,
    faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import InputRegister from "src/component/InputRegister";
import Panel from "./Panel";
import {UserContext} from "../context/UserContext";
import AniClassApi from "../apis/AniClassApi";
import {convertProgressLengthToPercent} from "../common/Useful";
import {useHistory} from 'react-router-dom';
import {LoadingContext} from "../context/LoadingContext";

const StudentPanelSetting =  () => {
    const history = useHistory();
    const {percent , setPercent} = useContext(LoadingContext);
    const {user, setUser} = useContext(UserContext);
    const [inputError, setInputError] = useState({error: false});
    const [name, setName] = useState('');
    const [family, setFamily] = useState('');
    const [email, setEmail] = useState('');
    const [nationalCode, setNationalCode] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [submitButton , setSubmitButton] = useState('');


    useEffect(()=> {

    } , []);


    const submit = (event) => {
        event.preventDefault();

        const isValid = isHaveNullInput();
        if(isValid.error) {
            setInputError(isValid)
            return;
        }
        setInputError({error: false});
        updateReq();
    }

    const updateReq = async () =>  {
        try {
            setPercent(1);
            submitButton.classList.add('is-loading');
            const result = await AniClassApi('/update-student' , {
                method: "PUT" ,
                onDownloadProgress: (event) => {
                    const percent = convertProgressLengthToPercent(event.loaded , event.total);
                    setPercent(percent);
                } ,
                data: {
                    new_national_code: nationalCode ? nationalCode : user.national_code ,
                    email: email ? email : user.email  ,
                    name: name ? name : user.name ,
                    family: family ? family : user.family ,
                    password: password ,
                    new_password: newPassword ? newPassword : password
                }
            });

            history.push('/reload?updated=1');
        } catch (err) {
            console.log(err.message) // TODO : ERROR HANDLE
        } finally {
            submitButton.classList.remove('is-loading');
            setPercent(100);
        }
    }


    const isHaveNullInput = () => {
        if(password  == null || password .length < 6) {
            return {error: "password"};
        }
        
        if(newPassword  !== '' ) {
            if(newPassword.length < 6 ) {
                return {error: 'newPassword'};
            }
            
            if(confirmNewPassword  !== newPassword ) {
                return {error: "confirmNewPassword"};
            }
        }
        

        return {error : false} ;
    }
    return (
        <Panel>
            <p className="is-size-6 has-text-weight-light panel-tabs">
                <Link to="/student-panel/following">???????? ?????? ?????????? ??????</Link>
                <Link to="/student-panel/setting" className="is-active">??????????????</Link>
                <Link to="/student-panel/logout">????????</Link>

            </p>
            <div className="mt-2 columns">
                <div className="column box is-5 m-rl-auto mb-5 p-5">
                    <form onSubmit={submit}>

                        <h3 className="is-size-4 has-text-weight-bold mb-5 has-text-primary">????????????
                            ???????? ????????????</h3>

                        <div className="is-flex  box has-background-success p-2 is-size-6 is-justify-content-right is-align-content-stretch">
                            <label className="is-light ml-4">?????? ???????? :</label>
                            <span className="has-text-warning">{user != null ? user.name : ''}</span>
                        </div>


                        <InputRegister id={'name'}
                                       issue={inputError}
                                       msgIssue={'???????? ?????? ?????? ???? ???????? ????????'}
                                       onChange={(value) => {
                                           setName(value.target.value)
                                       }}
                                       value={name}
                                       placeholder="?????? ????????"
                                       icon={faUserCircle}/>

                        <div className="is-flex  box has-background-success p-2 is-size-6 is-justify-content-right is-align-content-stretch">
                            <label className="is-light ml-4">?????? ???????????????? ???????? :</label>
                            <span className="has-text-warning">{user != null ? user.family : ''}</span>
                        </div>

                        <InputRegister id={'family'}
                                       msgIssue={'???????? ?????? ???????????????? ?????? ???? ???????? ????????'}
                                       onChange={(value) => {
                                           setFamily(value.target.value);
                                       }}
                                       value={family}
                                       issue={inputError}
                                       placeholder="?????? ???????????????? ????????"
                                       icon={faUserCircle}/>

                        <div className="is-flex  box has-background-success p-2 is-size-6 is-justify-content-right is-align-content-stretch">
                            <label className="is-light ml-4">?????????? ???????? :</label>
                            <span className="has-text-warning">{user != null ? user.email : ''}</span>
                        </div>

                        <InputRegister id={'email'}
                                       value={email}
                                       onChange={(value) => {
                                           setEmail(value.target.value);
                                       }}
                                       msgIssue={'???????? ?????????? ?????????? ???? ???????? ????????'}
                                       issue={inputError}
                                       placeholder="?????????? ????????"
                                       icon={faEnvelope}/>

                        <div className="is-flex  box has-background-success p-2 is-size-6 is-justify-content-right is-align-content-stretch">
                            <label className="is-light ml-4">???? ?????? ???????? :</label>
                            <span className="has-text-warning">{user != null ? user.national_code : ''}</span>
                        </div>

                        <InputRegister id={'national'}
                                       value={nationalCode}
                                       onChange={(value) => {
                                           setNationalCode(value.target.value);
                                       }}
                                       msgIssue={'???????? ???? ?????? ?????? ???? ???????? ????????'}
                                       issue={inputError} placeholder="???? ?????? ????????"
                                       icon={faQrcode}/>

                        <InputRegister id={'password'}
                                       value={password}
                                       onChange={(value) => {
                                           setPassword(value.target.value);
                                       }}
                                       msgIssue={'?????? ???????? ???????? ?????? ???????? ?????????? ???? 6 ???????? ????????'}
                                       issue={inputError} placeholder="?????? ???????? ???????? ??????"
                                       icon={faLock}/>


                        <InputRegister id={'newPassword'}
                                       value={newPassword}
                                       onChange={(value) => {
                                           setNewPassword(value.target.value);
                                       }}
                                       msgIssue={'?????? ???????? ???????? ?????? ???????? ?????????? ???? 6 ???????? ????????'}
                                       issue={inputError}
                                       placeholder="?????? ???????? ????????"
                                       icon={faLock}/>

                        <InputRegister id={'confirmNewPassword'}
                                       value={confirmNewPassword}
                                       onChange={(value) => {
                                           setConfirmNewPassword(value.target.value);
                                       }}
                                       msgIssue={'?????????? ?????? ???????? ???????????? ??????????'}
                                       issue={inputError}
                                       placeholder=" ?????????? ?????? ???????? ????????"
                                       icon={faLock}/>

                        <button className="button is-primary" ref={el => setSubmitButton(el)} type={"submit"}>
                            <span className="ml-2"> ?????? ??????????????????</span>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </button>
                    </form>
                </div>
            </div>
        </Panel>
    );
};

export default StudentPanelSetting;
