import React, {useContext, useEffect, useState} from 'react'
import Panel from './Panel';
import PanelClassItem from '../component/PanelClassItem';
import { Link } from 'react-router-dom';
import {LoadingContext} from "../context/LoadingContext";
import ScaleLoader from "react-spinners/ScaleLoader";
import AniClassApi from "../apis/AniClassApi";
import {useHistory} from 'react-router-dom';
import {convertProgressLengthToPercent} from "../common/Useful";

const TeacherPanelClass = () => {
    const history = useHistory();
    const {percent , setPercent} = useContext(LoadingContext);
    const [classItems , setClassItems] = useState([]);
    const [error , setError] = useState(false);

    useEffect(() => {
        fetchClassItems();
    } , []);


    const fetchClassItems = async () => {
        try {
            setPercent(0)
            const result = await AniClassApi('/classes-teacher/' , {
                method: 'GET' ,
                onDownloadProgress : event => {
                    const percnet = convertProgressLengthToPercent(event.loaded , event.total)
                    setPercent(percent);
                }
            });

            if(result.data.status === 'success') {
                setClassItems(result.data.data);
            } else {
                setError(true);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setPercent(100);
        }
    }

    const placeholderClassItem = () => {
        if(error) {
            return (<h4 className="has-text-danger mb-4">شما هیچ کلاسی ایجاد نکرده اید</h4>);
        } else {
            return (<ScaleLoader color={"#6200EA"} className="is-align-content-center ml-5" height={25} margin={2} width={4} radius={2}/>) ;
        }
    }

    return (
        <Panel>
            <p className="is-size-6 has-text-weight-light panel-tabs">
            <Link to="/teacher-panel/new-class">ساخت کلاس جدید</Link>
            <Link to="/teacher-panel/lessons" className="is-active">کلاس های ایجاد شده</Link>
            <Link to="/teacher-panel/setting" >تنظیمات</Link>
            <Link to="/teacher-panel/logout" >خروج</Link>
            </p>

            <div className="is-flex m-4 is-justify-content-space-evenly is-flex-wrap-wrap">
                {classItems.length === 0 ? placeholderClassItem() :
                    classItems.map(item =>
                        <PanelClassItem key={item.id}
                                        class_id={item.id}
                                        textButtonRight="مشاهده"
                                        textButtonLeft="ویرایش"
                                        onDanger={e => history.push(`/class/${item.id}/edit`)}
                                        study={item.department_name}
                                        lesson={item.title}
                                        teacher={"استاد : " + item.name + '\t' + item.family}
                        />
                    )
                }
            </div>
        </Panel>
    )
}

export default TeacherPanelClass;
