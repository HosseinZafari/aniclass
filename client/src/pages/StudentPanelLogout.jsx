import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import Panel from './Panel';
import AniClassApi from "../apis/AniClassApi";
import { useHistory } from "react-router-dom";
import {convertProgressLengthToPercent} from "../common/Useful";
import {LoadingContext} from "../context/LoadingContext";

const StudentPanelLogout = () => {
    const [submit , setSubmit] = useState(null);
    const [error , setError]   = useState(false);
    const {percent , setPercent} = useContext(LoadingContext);
    const history = useHistory();

    const logout = async () => {
        submit.classList.add('is-loading');
        setPercent(0);

        try {
            const result = await AniClassApi('/logout' , {
                method: "DELETE" ,
                onDownloadProgress : (event) => {
                    const percent = convertProgressLengthToPercent(event.loaded , event.total);
                    setPercent(percent);
                }
            });

            if(result.data.status === 'success') {
                history.push('/reload?clear=1');
            }
        } catch(err) {
            setError(true);
            console.log(err);
        } finally {
            setPercent(100);
            submit.classList.remove('is-loading');
        }
    }

    return (
        <Panel>
            <p className="is-size-6 has-text-weight-light panel-tabs">
                <Link to="/student-panel/following" >کلاس های دنبال شده</Link>
                <Link to="/student-panel/setting" >تنظیمات</Link>
                <Link to="/student-panel/logout" className="is-active">خروج</Link>
            </p>

            <div className="box p-5  has-text-centered">
                <p className="is-size-4 has-text-weight-bold mb-5 mt-4">آیا شما مطمئنین میخواهید خارج شوید ؟</p>
                <button ref={el => setSubmit(el)} onClick={logout} className="button is-danger mt-4" style={{width: '50%'}}>تایید</button>
            </div>
        </Panel>
    );
};

export default StudentPanelLogout;
