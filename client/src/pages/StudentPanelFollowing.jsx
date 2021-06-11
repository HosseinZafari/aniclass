import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import PanelClassItem from 'src/component/PanelClassItem'
import Panel from './Panel';
import AniClassApi from "../apis/AniClassApi";
import {LoadingContext} from "../context/LoadingContext";
import {convertProgressLengthToPercent} from "../common/Useful";
import ScaleLoader from "react-spinners/ScaleLoader";

const StudentPanelFollowing = () => {
    const {percent , setPercent} = useContext(LoadingContext);
    const [reservedClasses , setReservedClasses] = useState(null);
    const [error , setError] = useState(false);

    useEffect(() => {
        fetchAllReservedClass();
    } , []);

    const fetchAllReservedClass = async () => {
        try {
            setPercent(0);
            const result = await AniClassApi('reserve-class/all' , {
                method: "GET" ,
                onDownloadProgress: (event) => {
                    const percent = convertProgressLengthToPercent(event.loaded , event.total);
                    setPercent(percent);
                }
            });

            setReservedClasses(result.data.data);
        } catch (err) {
           console.log(err.message);
           setError(true);
        } finally {
            setPercent(100);
        }

    }

    const doUnreservedClass = async (item) => {
        try {
            setPercent(0)
            const result = await AniClassApi(`/unreserve-class/${item.class_id}` , {
                method: "DELETE" ,
                onDownloadProgress: event => {
                    const percent = convertProgressLengthToPercent(event.loaded , event.total);
                    setPercent(percent);
                }
            });
            setReservedClasses(reservedClasses.filter(index => index.id !== item.id ));
        } catch (err) {
            console.log(err.message);
        } finally {
            setPercent(100);
        }
    }

    const getPlaceHolder = () => {
        return error ? (<div className="is-flex is-fullwidth is-center-text">
            <span className="has-text-danger has-text-weight-bold mb-4">شما کلاسی را دنبال نمیکنید!</span>
        </div>) : (<ScaleLoader color={"#6200EA"}
                               className="is-align-content-center ml-5"
                               height={25}
                               margin={2}
                               width={4}
                               radius={2}
        />)
    }

    return (
        <Panel>
            <p className="is-size-6 has-text-weight-light panel-tabs">
                <Link to="/student-panel/following" className="is-active">کلاس های دنبال شده</Link>
                <Link to="/student-panel/setting" >تنظیمات</Link>
                <Link to="/student-panel/logout">خروج</Link>
            </p>

            <div className="is-flex m-4 is-justify-content-space-evenly is-flex-wrap-wrap">
                {reservedClasses == null ? (
                    getPlaceHolder()
                ) : (
                    reservedClasses.map(item =>
                        <PanelClassItem key={item.id}
                                        class_id={item.class_id}
                                        textButtonRight="مشاهده"
                                        textButtonLeft="لغو دنبال کردن"
                                        onDanger={e => doUnreservedClass(item)}
                                        study={item.department_name}
                                        lesson={item.class_title}
                                        teacher={"استاد: " + item.teacher_name + '\t' + item.teacher_family}
                        />
                    )
                )}
            </div>
        </Panel>
    );
};

export default StudentPanelFollowing;
